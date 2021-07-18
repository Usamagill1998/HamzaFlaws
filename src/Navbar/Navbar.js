import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "react-native";
import { Badge } from "react-native-paper";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, Divider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { getCartProducts } from "../Actions/CartActions";

// import { Avatar, Badge, Icon, withBadge } from "react-native-elements";

const Navbar = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getCartProducts());
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.iconView}>
          <TouchableOpacity
            onPress={navigation.toggleDrawer}
            style={styles.icon}
          >
            <FontAwesome
              name="reorder"
              size={24}
              color="black"
              // style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.logo}>
          <Avatar.Image
            size={70}
            source={require("../../assets/Logo.png")}
            style={{
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          />

          {cart.length === 0 ? (
            <View
              style={{
                position: "relative",
              }}
            >
              <AntDesign
                name="shoppingcart"
                size={30}
                color="black"
                style={styles.cartIcon}
                onPress={() => navigation.navigate("Cart")}
              />
            </View>
          ) : (
            <View
              style={{
                position: "relative",
              }}
            >
              <Badge style={styles.badge}>
                {cart.length !== 0 ? cart.length : <Text>!</Text>}
              </Badge>
              <AntDesign
                name="shoppingcart"
                size={30}
                color="black"
                style={styles.cartIcon}
                onPress={() => navigation.navigate("Cart")}
              />
            </View>
          )}
          {/* <View
            style={{
              position: "relative",
            }}
          >
            <Badge style={styles.badge}>
              {cart.length !== 0 ? cart.length : <Text>!</Text>}
            </Badge>
            <AntDesign
              name="shoppingcart"
              size={30}
              color="black"
              style={styles.cartIcon}
              onPress={() => navigation.navigate("Cart")}
            />
          </View> */}
        </View>
      </View>
      <Divider />
    </>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
    marginTop: 10,
    paddingBottom: 5,
    // justifyContent: "space-between",
  },
  iconView: {
    justifyContent: "center",
    // flex: 1,
    width: "37%",
    marginRight: 10,
    marginTop: 10,
    // backgroundColor: "green",
  },
  icon: {
    position: "absolute",
    left: 10,
    bottom: 10,
    flex: 2,
  },
  logo: {
    // justifyContent: "space-between",
    display: "flex",
    // backgroundColor: "green",
    // flex: 2,
    width: "63%",
  },
  cartIcon: {
    // justifyContent: "flex-end",
    position: "absolute",
    right: 20,
    bottom: 10,
    flex: 2,
  },
  badge: {
    backgroundColor: "#79901f",
    position: "absolute",
    // bottom: -40,
    right: 12,
    top: -54,
  },
});
