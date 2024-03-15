import React, { useState, useEffect } from "react";
import { Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Task from "./components/Task";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const [visibleTasks, setVisibleTasks] = useState(10); // Number of tasks to display initially

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const savedTasks = await AsyncStorage.getItem("tasks");
                if (savedTasks) {
                    setTaskItems(JSON.parse(savedTasks));
                }
            } catch (error) {
                console.error("Failed to load tasks from AsyncStorage:", error);
            }
        };

        loadTasks();
    }, []);

    const handleAddTask = async () => {
        if (!task || task.trim() === "") {
            // If task is empty or only contains whitespace, return early
            return;
        }
        Keyboard.dismiss(); // Dismisses the keyboard
        const newTaskItems = [...taskItems, { text: task, completed: false }];
        setTaskItems(newTaskItems);
        setTask(null);

        try {
            await AsyncStorage.setItem("tasks", JSON.stringify(newTaskItems));
        } catch (error) {
            console.error("Failed to save tasks to AsyncStorage:", error);
        }
    };

    const deleteTask = (index) => {
        const itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
        AsyncStorage.setItem("tasks", JSON.stringify(itemsCopy));
    };

    const completeTask = (index) => {
        const itemsCopy = [...taskItems];
        itemsCopy[index].completed = !itemsCopy[index].completed;
        setTaskItems(itemsCopy);
        AsyncStorage.setItem("tasks", JSON.stringify(itemsCopy));
    };

    const editTask = (index) => {
        const editedTask = taskItems[index];
        navigation.navigate("EditTask", { task: editedTask, onSave: handleSaveTask });
    };

    const handleSaveTask = (editedTask) => {
        const updatedTasks = taskItems.map((item) =>
            item.text === editedTask.text ? { ...item, text: editedTask.editedText } : item
        );
        setTaskItems(updatedTasks);
        AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const loadMoreTasks = () => {
        setVisibleTasks((prev) => prev + 10); // Increase the number of visible tasks
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("./assets/navIcon.png")}
                    style={{ width: 50, height: 50 }}
                />
                <Text style={styles.sectionTitle}>Today's tasks</Text>
            </View>
            <ScrollView style={styles.tasksWrapper}>
                <View style={styles.items}>
                    {taskItems.slice(0, visibleTasks).map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                            <Task
                                key={index}
                                index={index}
                                text={item.text}
                                completed={item.completed}
                                onToggle={completeTask}
                                onDelete={deleteTask}
                                onEdit={editTask}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                {visibleTasks < taskItems.length && (
                    <TouchableOpacity onPress={loadMoreTasks}>
                        <Text style={styles.loadMore}>Load More</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            {/* {Write to Task} */}

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput
                    style={styles.input}
                    placeholder={"Write a task"}
                    value={task}
                    onChangeText={(text) => setTask(text)}
                />
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFE1BD",
        paddingTop: 50,
    },
    tasksWrapper: {
        flex: 1, // Fill the available space
        paddingHorizontal: 20,
        marginBottom: 100, // Add margin to avoid overlap with the "Add New Task" input
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFE794",
        width: "100%",
        height: 80,
        justifyContent: "center",
        paddingRight: 100,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 15,
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: "absolute",
        bottom: 30,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#FFFFFF",
        borderRadius: 60,
        borderColor: "#C0C0C0",
        borderWidth: 1,
    },
    addWrapper: {
        width: 50,
        height: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#C0C0C0",
        borderWidth: 1,
    },
    addText: {
        fontSize: 30,
        color: "#C0C0C0",
    },
    loadMore: {
        textAlign: "center",
        color: "#000000",
        marginBottom: 20,
    },
});



export default HomeScreen;
