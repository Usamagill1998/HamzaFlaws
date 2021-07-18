import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Text,
} from "react-native";
//Text

import LottieView from "lottie-react-native";

export const TextIcon = ({ icon, text, url }) => {
  return (
    <View style={styles.detailContainer}>
      <LottieView
        source={icon}
        autoPlay
        loop
        resizeMode="contain"
        style={{ height: 50, marginRight: 20 }}
      />
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(url);
        }}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
