import React from "react";
import { View, StyleSheet } from "react-native";
//Components
import { ContactBody } from "./components";
import Navbar from "../Navbar/Navbar";
// Header;
export const ContactScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <ContactBody />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
