import React, {useEffect} from "react";
import Alert from "../Components/Alert";
import Navbar from "../Navbar/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EmptyCart } from "../Actions/CartActions";
import { useDispatch, useSelector } from "react-redux";
import server from "../apis/server";
import { View, Text,Keyboard,TouchableWithoutFeedback,ScrollView,TouchableOpacity} from "react-native";
import { RadioButton } from 'react-native-paper';
import DropDownPicker from "react-native-dropdown-picker";
import RNPickerSelect from 'react-native-picker-select';
import { Provider,  } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import Spinner from 'react-native-loading-spinner-overlay';


import {
  TextInput,   
  Button,
  Caption,
  Headline, 
  Portal,
} from "react-native-paper"; 
import { Formik } from "formik";
import axios from 'axios'
import * as yup from "yup";
// import { useEffect } from "react";


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
); 


export default function Checkout({ navigation,route }) {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [orderRef, setOrderRef] = React.useState();
  const [cartItems, setCartItems] = React.useState([]);
  const [value, setValue] = React.useState('Home Delivery');
  const [address, setAddress] = React.useState('');
  const [line, setLine] = React.useState([]);
  const [city, setCity] = React.useState('Address');
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [town, setTown] = React.useState('');

  const [gender, setGender] = React.useState();

  const genderList = [
    { label: "Male", value: "male" },

    { label: "Female", value: "female" },

    { label: "Others", value: "others" },
  ];   

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
     const { totalPrice } = route.params;

    // const done = (address)=> {
    // alert(address)
        

  //  https://api.getaddress.io/find/tw32hb?expand=true&api-key=WMv1i6R2vU2BR7TPY3rKfg31647

  //  const urls = `https://api.getaddress.io/find/${tw32hb}?expand=true&api-key=WMv1i6R2vU2BR7TPY3rKfg31647`;
  //   const likeDataa =
  //   {
  //    UserID : user?.userId,
  //    AuctionID : post?.auctionID,
  //    }
  //  const blockhainRsponsee = await axios.post(urls,likeDataa);
  //  const likeCounters = blockhainRsponsee.data.data.likeCount
  //  setLikeCounter(likeCounters)
    //}

  let validationSchema = yup.object({
    firstName: yup.string().required("first name is required"),
    lastName: yup.string().required("last name is required"),
    contactDetails: yup
      .number()
      // .max(11)
      .min(11) 
      .required("Phone number is required"),
    // shippingAddress: yup.string().required("Address is required"),
    // city: yup.string().required("enter the city"),
    // province: yup.string().notRequired("Enter your province"),
  });

  useEffect(() => {
    let cartArrayForBackend = [];

    // alert(JSON.stringify(cart))
    for (let prods of cart) {
 

 
       
      // alert(JSON.stringify(prods))
      // delete prods.product;
       cartArrayForBackend.push(prods);
      // }
    }
    setCartItems(cartArrayForBackend);
  }, []);

  const handleCheckout = (values, resetForm) => {
    // const data = { ...values, cartItems: cartItems,deliveryType:value,total:totalPrice};
    //  alert(JSON.stringify(data))
    
    AsyncStorage.getItem("hamzaFlawsToken")
    .then((res) => {
      const token = res;
 
      if (!token) {
        return navigation.navigate("Login");
      }

    AsyncStorage.getItem("hamzaFlawsUser").then((res) => {

      const user =  JSON.parse(res)
      //  alert(JSON.stringify(user)) 
      const data = { ...values, cartItems: cartItems,deliveryType:value,total:totalPrice,userID:user._id,
        shippingAddress: city,
         city: town,
        province: address,
      };

      navigation.navigate("paypall", {
        totalPrice: totalPrice,
        data:data
        // }); 
    });
   })

  })


   
    







    //   if (!res) {
    //     return navigation.navigate("Login");
    //   }
    //   server
    //     .post("/checkout", data, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${res}`,
    //       },
    //     })
    //     .then((res) => {
    //       dispatch(EmptyCart());
    //       setOrderRef(res.data.data.orderRef);
    //       setVisible(true);
    //       resetForm({
    //         values: "",
    //       });
    //     })
    //     .catch((e) => {
    //       setError(true);
    //       alert(e.message);
    //       console.log(e);
    //     });
    // });
  };




  const handle = async () => { 
   //  alert(address)   


 

setLoading(true)

  // https://api.getaddress.io/find/tw32hb?expand=true&api-key=WMv1i6R2vU2BR7TPY3rKfg31647
   const urls = `https://api.getaddress.io/find/${address}?expand=true&api-key=jL4wQ7ht-ky0LjXPIQYsMQ32071`;
    
   const blockhainRsponsee = await axios.get(urls);
   console.log(blockhainRsponsee?.data)
   if(blockhainRsponsee?.data){
   const data = blockhainRsponsee?.data
   
    const response  =   data?.addresses
    setTown(data?.addresses[0].town_or_city)
let transformed = response?.map(({ line_2, name }) => ({ label: line_2, value: line_2 }));
setLine(transformed);
setLoading(false)
   }
   else{
     alert('Postal Code is Not Valid')
     setLoading(false)
   }
  } 
  return (
     <Provider>
           <>
           <Spinner
          visible={loading || visible}
          textContent={'Loading...'}
        />
      <Navbar navigation={navigation} />
      <Portal.Host>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "white",
          }}
        >
          <Headline style={{ marginBottom: 10 }}>
            Enter Order Details
          </Headline>
          <ScrollView contentContainerStyle={{flexGrow: 1}}
  keyboardShouldPersistTaps='handled'
>
          <Formik
            initialValues={{  
              firstName: "",
              lastName: "",
              contactDetails: "",
              
              province: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleCheckout(values, resetForm);
            }}
          >
            {(formikProps) => (
              <>
                <TextInput
                  id="firstname"
                  name="firstName"
                  label="FirstName"
                  mode="outlined"
                  dense
                  value={formikProps.values.firstName}
                  onChangeText={formikProps.handleChange("firstName")}
                  style={{ width: "95%" }}
                  onBlur={formikProps.handleBlur("firstName")}
                  error={
                    formikProps.errors.firstName &&
                    formikProps.touched.firstName
                      ? true
                      : false
                  }
                />
                <View style={{ width: "95%" }}>
                  {formikProps.errors.firstName &&
                  formikProps.touched.firstName ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.firstName}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>
                <TextInput
                  id="lastName"
                  lastName="lastName"
                  label="LastName"
                  mode="outlined"
                  dense
                  value={formikProps.values.lastName}
                  onChangeText={formikProps.handleChange("lastName")}
                  style={{ width: "95%" }}
                  onBlur={formikProps.handleBlur("lastName")}
                  error={
                    formikProps.errors.lastName && formikProps.touched.lastName
                      ? true
                      : false
                  }
                />
                <View style={{ width: "95%" }}>
                  {formikProps.errors.lastName &&
                  formikProps.touched.lastName ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.lastName}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>

                <TextInput
                  id="contactDetails"
                  name="contactDetails"
                  label="Phone Number"
                  mode="outlined"
                  dense
                  value={formikProps.values.contactDetails}
                  onChangeText={formikProps.handleChange("contactDetails")}
                  style={{ width: "95%" }}
                  onBlur={formikProps.handleBlur("contactDetails")}
                  error={
                    formikProps.errors.contactDetails &&
                    formikProps.touched.contactDetails
                      ? true
                      : false
                  }
                />

                <View style={{ width: "95%" }}>
                  {formikProps.errors.contactDetails &&
                  formikProps.touched.contactDetails ? (
                    <Caption
                      style={{
                        color: "red",
                      }}
                    >
                      {formikProps.errors.contactDetails}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>



                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "center",
                    // alignContent: "center",
                  }}
                >
                <TextInput
                  id=" shippingAddress"
                  name=" shippingAddress"
                  label="Postal Code"
                  // multiline
                  mode="outlined" 
                  dense
                  value={address}
                  // onEndEditing ={done(formikProps.values.shippingAddress)}
                  onChangeText={newValue => setAddress(newValue)}
                  style={{ width: "45%" }}
                  onBlur={formikProps.handleBlur("shippingAddress")}
                  error={
                    formikProps.errors.shippingAddress &&
                    formikProps.touched.shippingAddress
                      ? true
                      : false
                  }
                  // eye-off-outline
                />
                <TouchableOpacity onPress={handle}>
                <Text style ={{marginHorizontal:30}}>Search</Text>
                </TouchableOpacity>
               
                </View>
                 
                <View style ={{width:'95%'}}>
                <DropDown
          label={"Address"}
          dropDownStyle={{width:'95%'}}
          mode={"outlined"}
          value={city}
          setValue={setCity}
          list={line}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          
        />
        </View>

             
                
                <View style={{ width: "95%" }}>
                  {
                  formikProps.errors.shippingAddress &&
                  formikProps.touched.shippingAddress ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.shippingAddress}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )
                  }
                </View>

                {/* two columns */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "center",
                    // alignContent: "center",
                  }}
                >
                  {/* <View style={{ width: "%" }}> */}
                    <TextInput
                      id="city"
                      name="city"
                      label="City"
                      multiline
                      mode="outlined"
                      dense
                      value={town}
                      disabled={true}
                  //    onChangeText={formikProps.handleChange("city")}
                      style={{ width: "95%" }}
                      onBlur={formikProps.handleBlur("city")}
                      error={
                        formikProps.errors.city && formikProps.touched.city
                          ? true
                          : false
                      }
                      // eye-off-outline
                    />

                </View>

                <View style={{
                   display: "flex",
                   flexDirection: "row",
                   alignItems: "flex-start",
                }}>
     <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View> 
        <Text>Home Delivery</Text>
        <RadioButton value="Home Delivery" />
      </View>
      <View>
        <Text>Take Away</Text>
        <RadioButton value="Take Away" />
      </View>
    </RadioButton.Group>
    </View> 

    
                <Button
                  style={{ marginTop: 10, borderRadius: 50 }}
                  mode="contained"
                  onPress={formikProps.handleSubmit}
                  type="submit"
                  onPress={formikProps.handleSubmit}
                >
                  Order Now !
                </Button>
              </>
            )}
          </Formik>

          <View style={{minHeight: 300}}>
          {/* <DropDownPicker
               zIndex={1000}
               itemStyle={{ justifyContent: "flex-start" }}
               defaultValue={'usa'}
              // style={{ borderColor: 'grey', borderRadius: 50 }}
              containerStyle={{
                // height: 40,
                // borderRadius: 50,
                width:'70%' 
              }}
              onChangeItem={(item) => {
                setCity(item.value); 
              }}
              items={[
                {label: 'USA', value: 'usa'},
                {label: 'UK', value: 'uk' },
                {label: 'France', value: 'france'},
              ]}
            /> */}


{/* <RNPickerSelect
            onValueChange={(value) => setCity(value)}
            placeholder ={city}
            value ={'football'}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        /> */}
            </View>
          </ScrollView>
        </View>
        <Alert
          visible={visible}
          setVisible={setVisible}
          orderRef={orderRef}
          navigation={navigation}
        />
      </Portal.Host>
    </>
    </Provider>
  );
}
