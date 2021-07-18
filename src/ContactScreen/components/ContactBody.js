import React from "react";
import { View, StyleSheet, Text } from "react-native";
//Text

import { TextIcon } from "./TextIcon";

export const ContactBody = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.title}>contact us</Text>
      <View style={styles.info}>
        <TextIcon
          icon={require("../../Components/IconAnimation/location.json")}
          text="14 Phan Ngữ"
          url="mailto: anhquan291@gmail.com"
        />
        <TextIcon
          icon={require("../../Components/IconAnimation/email3.json")}
          text="Anhquan291@gmail.com"
          url="mailto: anhquan291@gmail.com"
        />
        <TextIcon
          icon={require("../../Components/IconAnimation/phone2.json")}
          text="0968729194"
          url="tel:0968729194"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 20,
  },
  info: {
    marginTop: 20,
  },
});
