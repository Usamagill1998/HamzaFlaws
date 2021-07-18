import AsyncStorage from "@react-native-async-storage/async-storage";

export const addToCart =
  (product, quantity, price, selectProductType, navigation) =>
  async (dispatch) => {
    try {
      let cartProduct;
      const cart = await AsyncStorage.getItem("hamzaFlawsUsersCart");
      cartProduct = JSON.parse(cart);

      if (!cartProduct || cartProduct.length === 0) {
        let productArray = [
          {
            productId: product._id,
            quantity: quantity,
            product: product,
            price: quantity * price,
            type: selectProductType,
          },
        ];

        // window.localStorage.setItem(`usersCart`, JSON.stringify(productArray));
        //   try {
        await AsyncStorage.setItem(
          "hamzaFlawsUsersCart",
          JSON.stringify(productArray)
        );
        dispatch({ type: "ADD_TO_CART", payload: productArray });
        //   } catch (e) {
        // console.log(e.message);
        //   }
        return navigation.navigate(`Cart`);
      }
      if (cartProduct.length > 0) {
        //    Checking either there is any product in the cart
        const updatedCartItems = [...cartProduct];
        let newQuantity;
        //   Checking either there is the same product in the cart

        const cartProductIndex = cartProduct.findIndex((cartProduct) => {
          return cartProduct.productId === product._id; //it will return true if the product is in the cart
        });

        // If Product already exist then chaniging  its quantity
        if (cartProductIndex >= 0) {
          newQuantity = cartProduct[cartProductIndex].quantity + quantity;
          updatedCartItems[cartProductIndex].quantity = newQuantity;
          updatedCartItems[cartProductIndex].price = newQuantity * price;
        } else {
          updatedCartItems.push({
            productId: product._id,
            quantity: quantity,
            price: quantity * price,
            product: product,
            type: selectProductType,
          });
        }

        //  try {
        //     const cartProduct = await JSON.parse(AsyncStorage.getItem('usersCart'));
        //   } catch(e) {
        //     console.log(e.message);
        //   }
        await AsyncStorage.removeItem("hamzaFlawsUsersCart");

        // window.localStorage.removeItem(`hamzaFlawsUsersCart`);  //web

        // window.localStorage.setItem(`hamzaFlawsUsersCart`, JSON.stringify(updatedCartItems));

        await AsyncStorage.setItem(
          "hamzaFlawsUsersCart",
          JSON.stringify(updatedCartItems)
        );
        dispatch({ type: "ADD_TO_CART", payload: updatedCartItems });

        return navigation.navigate(`Cart`);
      } else {
        await AsyncStorage.setItem(
          `hamzaFlawsUsersCart`,
          JSON.stringify([
            {
              productId: product._id,
              quantity: quantity,
              product: product,
              price: quantity * price,
              type: selectProductType,
            },
          ])
        );
        dispatch({ type: "ADD_TO_CART", payload: updatedCartItems });
        return navigation.navigate(`Cart`);
      }
    } catch (error) {
      console.log(error);
    }
  };

export const RemoveItemFromCart = (productId) => async (dispatch) => {
  // const user = JSON.parse(window.localStorage.getItem("user"));
  let cartProduct;

  try {
    const product = await AsyncStorage.getItem("hamzaFlawsUsersCart");
    cartProduct = JSON.parse(product);

    const updatedCartItems = cartProduct.filter((item) => {
      return item.productId !== productId;
    });

    await AsyncStorage.removeItem("hamzaFlawsUsersCart");

    await AsyncStorage.setItem(
      "hamzaFlawsUsersCart",
      JSON.stringify(updatedCartItems)
    );
    // return updatedCartItems;
    dispatch({ type: "REMOVE_FROM_CART", payload: updatedCartItems });
  } catch (error) {
    console.log(error);
  }
};

export const getCartProducts = () => (dispatch) => {
  AsyncStorage.getItem("hamzaFlawsUsersCart")
    .then((value) => {
      const product = JSON.parse(value);

      dispatch({ type: "GET_CART_PRODUCTS", payload: product });
    })
    .catch((e) => {
      console.log(e.message);
    });
};

export const EmptyCart = () => (dispatch) => {
  AsyncStorage.removeItem("hamzaFlawsUsersCart")
    .then(() => {
      // const product = JSON.parse(value);

      dispatch({ type: "EMPTY_CART" });
    })
    .catch((e) => {
      console.log(e.message);
    });
};
