import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Box({ message }) {
  return (
    <View style={styles.center}>
      <Text style={{ textAlign: "center" }}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    // display: "flex",
    // flex: 1,
    // justifyContent:'center',
    // position: "absolute",
    // top: "50%",
    // left: "5%",
    textAlign: "center",
    alignContent: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#ce3c31",
    borderRadius: 4,
    width: "80%",
    backgroundColor: "#e0aca8",
    padding: 10,
    // marginLeft: 10,
  },
});
