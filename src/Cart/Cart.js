import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { baseUrl } from "../apis/server";
import { toTitleCase } from "../Utils/CamelCase";
import { RemoveItemFromCart, getCartProducts } from "../Actions/CartActions";
import Box from "../Components/Box";
import { ScrollView, View, Image, TouchableOpacity, Text } from "react-native";
import { Divider } from "react-native-paper";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Styles from "./Styles";

export default function Cart({ navigation }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [total, setTotal] = useState(0);
  // const [cartProducts, setCartProducts] = useState([]);
  // const [getCartItems, setGetCartItems] = useState(false);

  useEffect(() => {
    dispatch(getCartProducts());
    if (cart) {
      let totalPrice = 0;
      for (let cartProduct of cart) {
        totalPrice = cartProduct.price + totalPrice;
      }

      setTotal(totalPrice);
    }
  }, [cart]);

  const removeCartItem = (productId) => {
    dispatch(RemoveItemFromCart(productId));
  };

  const handleCheckoutRoute = () => {
    //  navigation.navigate("paypall");


   

    AsyncStorage.getItem("hamzaFlawsUser").then((res) => {
      if (!res) {
        return navigation.navigate("Login");
      }
      navigation.navigate("checkout", {
        totalPrice: `${total}`,
        // });
    });
  });
}

  return (
    <>
      <Navbar navigation={navigation} />
      {cart.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Box message="Your cart is empty" />
        </View>
      ) : (
        <ScrollView style={{ backgroundColor: "white" }}>
          {cart.map((product) => {
            return (
              <>
                <View style={Styles.container} key={product.productId}>
                  <Image
                    source={{ uri: `${baseUrl}/${product.product.imageUrl}` }}
                    style={Styles.image}
                  />

                  <View style={Styles.productInfo}>
                    <Text style={Styles.headline}>
                      {toTitleCase(product.product.title)}
                    </Text>

                    <Text>£ {product.price}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text>{product.quantity}</Text>
                  </View>

                  <View style={Styles.productQuantity}>
                    <TouchableOpacity
                      // activeOpacity={0.7}
                      onPress={() => removeCartItem(product.productId)}
                    >
                      <Icon name="times" size={34} style={Styles.icon} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Divider />
              </>
            );
          })}
        </ScrollView>
      )}

      <View style={Styles.checkout}>
        {cart.length !== 0 ? (
          <Button
            mode="contained"
            onPress={handleCheckoutRoute}
            style={Styles.checkout}
          >
            checkout Total £ {total}
          </Button>
        ) : (
          <Button
            mode="contained"
            style={Styles.checkout}
            onPress={() => navigation.navigate("Home")}
          >
            Shop Now
          </Button>
        )}
      </View>
    </>
  );
}
