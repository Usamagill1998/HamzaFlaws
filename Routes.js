import React from "react";
import HomeScreen from "./src/Home/Home";
import LoginScreen from "./src/Login/Login";
import SignupScreen from "./src/Signup/Signup";
import OrderScreen from "./src/Order/Order";
import ResetPassword from "./src/ResetPassword/ResetPassword";
import ForgetPassword from "./src/ForgetPassword/ForgetPassword";
import CartScreen from "./src/Cart/Cart";
import CheckoutScreen from "./src/Chechout/Checkout";
// import CreditCard from "./src/CreditCard/CreditCard";
import DetailedPage from "./src/DetailedPage/Detailedpage";
import AboutUsScreen from "./src/AboutUs/AboutUs";
import { ContactScreen } from "./src/ContactScreen/ContactScreen";
import ConfirmForgetPassword from "./src/ConfirmForgetPassword/ConfirmForgetPassword";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./src/Components/CustomDrawerContent";
import Paypall from "./src/Payment/Paypall";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
// import { useDispatch } from "react-redux";
// import { fetchProducts } from "./src/Actions";
 import Mapview1 from "./src/Mapview/MapView";
// import MapView from "react-native-maps";

const theme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    primary: "#79901f",
    accent: "#f1c40f",
  },
};

export default function Routes() {
  const Drawer = createDrawerNavigator();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, []);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerType="slide"
          drawerPosition="left"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerIcon
          initialRouteName="Home"
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Signup" component={SignupScreen} />
          <Drawer.Screen name="Order" component={OrderScreen} />
          <Drawer.Screen name="resetPassword" component={ResetPassword} />
          <Drawer.Screen name="forgetPassword" component={ForgetPassword} />
          <Drawer.Screen name="checkout" component={CheckoutScreen} />
          <Drawer.Screen
            name="confirmForgetPassword"
            component={ConfirmForgetPassword}
          />
          <Drawer.Screen name="aboutus" component={AboutUsScreen} />
          <Drawer.Screen name="detaledPage" component={DetailedPage} />
          {/* <Drawer.Screen name="creditCard" component={CreditCard} /> */}
          <Drawer.Screen name="Cart" component={CartScreen} />
          <Drawer.Screen name="contactus" component={ContactScreen} />
          <Drawer.Screen name="paypall" component={Paypall} />
          <Drawer.Screen name="maps" component={Mapview1} />

        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
