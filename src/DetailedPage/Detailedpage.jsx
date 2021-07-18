import React, { useState, useEffect } from "react";
import { getProductById } from "../apis/product";
import { baseUrl } from "../apis/server";
import { addToCart } from "../Actions/CartActions";
import { useDispatch } from "react-redux";
import ProgressCircle from "../Components/CircularProgress";
import Navbar from "../Navbar/Navbar";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export default function Detailedpage({ navigation, route }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const [selectProductType, setSelectedProductType] = useState("regular");
  let [loading, setLoading] = useState(true);

  let [product, setProduct] = useState({
    _id: "",
    category: "",
    imageUrl: "",
    largePrice: null,
    price: null,
    regularPrice: null,
    title: "",
    priceToBeAdded: null,
  });
  let [productPrice, setProductPrice] = useState(0);
  let [producQuantity, setQuantity] = useState(1);
  useEffect(() => {
    setLoading(true);
    getProductById(id, setLoading, setProduct, setProductPrice);
    return () => {
      setProduct(null);
      setLoading(true);
    };
  }, [id]);

  const handleSubtraction = () => {
    if (producQuantity !== 1) {
      setQuantity(--producQuantity);
    }
  };

  useEffect(() => {
    let price = 0;
    // if (
    //   product.price &&
    //   (selectProductType === "regular" || selectProductType === "large") &&
    //   !product.regularPrice &&
    //   !product.largePrice
    // ) {
    //   //logic if price field exist
    //   const price = producQuantity * product.price;
    //   return setProductPrice(price);
    // }
    if (
      !product.price &&
      selectProductType === "regular" &&
      product.regularPrice
    ) {
      //logic if regularPrice field exist
      const price = producQuantity * product.regularPrice;
      return setProductPrice(price);
    }
    if (!product.price && selectProductType === "large" && product.largePrice) {
      //logic if largePrice field exist
      const price = producQuantity * product.largePrice;
      return setProductPrice(price);
    }

    if (
      product.regularPrice &&
      product.category === "Ice Cream -Scoop" &&
      product.priceToBeAdded
    ) {
      const price = producQuantity * product.priceToBeAdded;
      price = price + product.price;
      return setProductPrice(price);
    }
    setProductPrice(price);
  }, [producQuantity, selectProductType]);

  return (
    <View style={style.mainContainer}>
      <Navbar navigation={navigation} />
      {/* Image+Quantity comtaineer start */}
      {loading ? (
        <ProgressCircle />
      ) : (
        <>
          <View style={style.imageContainer}>
            <Image
              source={{ uri: product?.imageUrl }}
              resizeMode="cover"
              style={style.imageStyle}
            />
            <View style={style.quantityContainer}>
              <TouchableOpacity
                style={style.qunatityButtonLeft}
                onPress={handleSubtraction}
              >
                <Text style={{ fontSize: 40 }}>-</Text>
              </TouchableOpacity>

              <View style={style.quantity}>
                <Text>{producQuantity}</Text>
              </View>

              <TouchableOpacity
                style={style.qunatityButtonRight}
                onPress={() => setQuantity(++producQuantity)}
              >
                <Text style={{ fontSize: 25 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Image+Quantity comtaineer End */}

          <View style={style.titleView}>
            <Text style={style.titleText}>{product.title}</Text>
          </View>

          <View>
            <Text style={style.centerText}>{product.category}</Text>
          </View>

          {/* picker View*/}
          <View style={style.optionsView}>
            {/* picker */}
            {product.category !== "Ice Cream -Scoop" ? (
              <>
                <View>
                  <Text style={style.centerText}>
                    Select the appropriate options to add product to the cart
                  </Text>
                </View>
                <Picker
                  selectedValue={selectProductType}
                  mode="dropdown"
                  style={style.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedProductType(itemValue)
                  }
                >
                  <Picker.Item label="Regular" value="regular" />
                  <Picker.Item label="Large" value="large" />
                </Picker>
              </>
            ) : (
              <Text> </Text>
            )}
          </View>

          {/* Lower Container To Show the Price and Qunatity of the product to be the CArt */}

          <View style={style.cartButtonAndPriceContainer}>
            {/* price and qunatity container starts */}
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "50%" }}>
                <Text style={{ fontSize: 15 }}>
                  {producQuantity} item to be in the cart of price
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={{ fontSize: 15, textAlign: "center" }}>
                  £ {productPrice}
                </Text>
              </View>
            </View>

            {/* price and qunatity container ends */}

            <Button
              style={{ marginTop: 10, borderRadius: 50 }}
              mode="contained"
              type="submit"
              onPress={() =>
                dispatch(
                  addToCart(
                    product,
                    producQuantity,
                    productPrice,
                    selectProductType,
                    navigation
                  )
                )
              }
            >
              Add To cart
            </Button>
          </View>
        </>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  imageContainer: {
    // marginTop: 10,
    height: 300,
    width: windowWidth,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityContainer: {
    position: "absolute",
    bottom: 0,
    // left: "26%",
    display: "flex",
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    flexDirection: "row",
    // justifyContent: "center",
    // textAlign: "center",
    alignItems: "center",
    width: 150,
    height: 35,

    backgroundColor: "#f2f2f2",
    // borderR,
  },
  qunatityButtonLeft: {
    justifyContent: "center",
    width: 50,
    height: 35,
    // borderColor: "#f2f2f2",
    // backgroundColor: "green",
    alignItems: "center",
    textAlign: "center",
  },
  quantity: {
    justifyContent: "center",
    width: 50,
    height: 35,
    alignItems: "center",
    textAlign: "center",
    // backgroundColor: "yellow",
  },
  qunatityButtonRight: {
    justifyContent: "center",
    width: 50,
    height: 35,
    // borderColor: "#f2f2f2",
    // backgroundColor: "blue",
    alignItems: "center",
    textAlign: "center",
  },
  imageStyle: {
    height: 300,
    width: "100%",
  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleView: {
    marginTop: 20,
  },
  centerText: {
    fontSize: 12,
    textAlign: "center",
  },
  optionsView: {
    // width: 200,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    // borderRadius: 50,
    // backgroundColor: "#f2f2f2",
  },
  pickerStyle: {
    marginTop: 10,
    height: 50,
    width: 150,
    borderRadius: 50,
    backgroundColor: "#f2f2f2",
  },
  cartButtonAndPriceContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#f2f2f2",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    height: 200,
    // paddingLeft: 20,
    // paddingRight: 20,
    padding: 50,
    // marginLeft: 10,
    // marginRight: 10,
    // marginTop: 10,
  },
});
