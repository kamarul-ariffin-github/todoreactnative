// EditTaskScreen.js
import React, { useState } from "react";
import { Image } from "react-native";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const EditTaskScreen = ({ route, navigation }) => {
    const { task, onSave } = route.params;
    const [editedText, setEditedText] = useState(task.text);

    const handleSave = () => {
        onSave({ ...task, editedText });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("./assets/navIcon.png")}
                    style={{ width: 50, height: 50 }}
                />
                <Text style={styles.sectionTitle}>Edit Task</Text>
            </View>
            <View style={styles.writeTaskWrapper}>
                <TextInput
                    style={styles.input}
                    value={editedText}
                    onChangeText={setEditedText}
                />
            </View>
            <View style={styles.writeTaskWrapper}>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFE1BD",
        paddingTop: 50,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFE794",
        width: "100% ",
        height: 80,
        justifyContent: "center",
        paddingRight: 100,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 15,
    },
    writeTaskWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 15,
        marginVertical: 15,
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
    saveButton: {
        width: "20%",
        height: 50,
        backgroundColor: "#67CE1A",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#C0C0C0",
        borderWidth: 1,
    },
    cancelButton: {
        width: "20%",
        height: 50,
        backgroundColor: "#D22B2B",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#C0C0C0",
        borderWidth: 1,
    },
    saveButtonText: {
        fontSize: 18,
        color: "#FFFFFF",
    },
    cancelButtonText: {
        fontSize: 18,
        color: "#FFFFFF",
    },
});

export default EditTaskScreen;
