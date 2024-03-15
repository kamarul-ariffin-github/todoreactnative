import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Feather } from "@expo/vector-icons"; // Import the icons

const Task = (props) => {
  const handleToggle = () => {
    props.onToggle(props.index);
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => props.onDelete(props.index),
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = () => {
    props.onEdit(props.index);
  };

  return (
    <View>
      <View style={props.completed ? styles.itemCompleted : styles.item}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleToggle} style={styles.square}>
            {props.completed && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={props.completed ? styles.textCompleted : styles.text}>
            {props.text}
          </Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleEdit}>
            <Text>
              <Feather name="edit" size={24} color="black" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text>
              <Feather name="trash-2" size={24} color="red" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FAA136",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemCompleted: {
    backgroundColor: "#FFC074",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#FEFFDF",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    fontSize: 18,
    color: "#000000",
  },
  text: {
    maxWidth: "80%",
  },
  textCompleted: {
    maxWidth: "80%",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
  },
});

export default Task;
