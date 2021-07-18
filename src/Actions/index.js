import AsyncStorage from "@react-native-async-storage/async-storage";
import server from "../apis/server";

export const signIn = (user, token, navigation) => async (dispatch) => {
  // local storage needs to be implemented
  try {
    await AsyncStorage.setItem("hamzaFlawsUser", JSON.stringify(user));
    await AsyncStorage.setItem("hamzaFlawsToken", token);
    dispatch({
      type: "SIGN_IN",
      payload: user,
    });
    navigation.navigate("Home");
  } catch (error) {
    console.log(error.message);
  }
};

export const signOut = (navigation) => async (dispatch) => {
  dispatch({
    type: "SIGN_OUT",
  });
  await AsyncStorage.removeItem("hamzaFlawsUsersCart");
  await AsyncStorage.removeItem("hamzaFlawsUser");
  await AsyncStorage.removeItem("hamzaFlawsToken");
  dispatch({ type: "EMPTY_CART" });
  navigation.navigate("Login");
};

export const loggedInUser = (user) => async (dispatch) => {
  dispatch({
    type: "SIGN_IN",
    payload: user,
  });
};

export const fetchProducts =
  (setLoading, setFilteredProduct) => async (dispatch, getState) => {
    try {
      const { data } = await server.get(`/shop/getProducts/`);
      dispatch({ type: "FETCH_PRODUCTS", payload: data.products });
      // alert('gg')
      setFilteredProduct(data.products);
      // console.log(data.products) 
      setLoading(false);
    } catch (e) {
      // alert(JSON.stringify(e.request))
      console.log(e.message);
    }
  };

// export const fetchProduct = (product) => async (dispatch) => {
//   dispatch({ type: "FETCH_PRODUCT", payload: product });
// }; 
