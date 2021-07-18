import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
// import { useDispatch } from "react-redux";
// import { baseUrl } from "../apis/server";
import { Avatar, Divider, Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
// import { toTitleCase } from "../Utils/CamelCase";
// import { addToCart } from "../Actions/CartActions";
// import { , Card, Paragraph } from "react-native-paper";

const ProductCard = ({ navigation }) => {
  // const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.columnOne}>
        <Avatar.Image
          size={120}
          source={require("../../assets/Logo.png")}
          style={{
            // paddingTop: 5,
            // paddingBottom: 10,
            paddingLeft: 0,
            backgroundColor: "transparent",
            alignItems: "center",
            width: "100%",
          }}
        />
      </View>
      <View style={styles.columnTwo}>
        <View style={{ paddingTop: 10 }}>
          <Text style={styles.title}>Product Name</Text>
          <Text style={styles.subtitle}>5 £</Text>
          <Text>Per Scoop </Text>
          <Text>Regular Price: 5 £</Text>
          <Text>Regular Price:10 £</Text>
        </View>

        <AntDesign
          name="pluscircle"
          size={50}
          color="black"
          onPress={navigation.navigate("Cart")}
          style={styles.addToCartButton}
        />
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    // borderRadius: 10,
    // borderColor: "#f2f2f2",
    // borderWidth: 2,
    // height: 10,
    padding: 10,
    flexDirection: "row",
    backgroundColor: "white",
  },

  columnOne: {
    width: "40%",
  },
  columnTwo: {
    width: "60%",
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    fontWeight: "bold",
    marginTop: 2,
  },
  addToCartButton: {
    position: "absolute",
    // left: "40%",
    // bottom: -70,
    justifyContent: "flex-end",
    right: 10,
    top: "33%",
  },
});
export default ProductCard;
