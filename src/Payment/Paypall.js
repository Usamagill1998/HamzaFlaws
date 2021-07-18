// import React from "react";
// import WebView from "react-native-webview";
// import { ActivityIndicator } from "react-native";
// // import ProgressCircle from "../Components/CircularProgress";
// import { baseUrl } from "../apis/server";

// export default function Paypall({ navigation, route }) {
//   //   const { totalPrice } = route.params;
//   const handleResponse = (navState) => {
//     const { url, title } = navState;
//     console.log(navState);
//     if (title == "PayPal Sucess") {
//       console.log("url", url);
//       let spliturl = url.split("?");
//       // console.log("spliturl",spliturl);
//       let splitotherhalf = spliturl[1].split("&");
//       console.log("splitotherhalf", splitotherhalf);
//       let paymentId = splitotherhalf[0].replace("paymentId=", "");
//       let token = splitotherhalf[1].replace("token=", "");
//       let PayerID = splitotherhalf[2].replace("PayerID=", "");
//       navigation.navigate("checkout", {
//         payId: paymentId,
//         token: token,
//         payerId: PayerID,
//       });
//       // console.log("paymentId", paymentId);
//       // console.log("token", token);
//       // console.log("PayerID", PayerID);
//     }
//   };
//   return (
//     <WebView
//       source={{
//         uri: `${baseUrl}/paypall/`,
//       }}
//       style={{ marginTop: 35 }}
//       startInLoadingState={true}
//       onNavigationStateChange={(data) => handleResponse(data)}
//       renderLoading={() => (
//         <ActivityIndicator
//           color="green"
//           size="large"
//           style={{
//             flex: 1,
//           }}
//         />
//       )}
//     />
//   );
// }












import React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import ProgressCircle from "../Components/CircularProgress";
import { EmptyCart } from "../Actions/CartActions";


import { CreditCardInput } from "react-native-credit-card-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import server from "../apis/server";
import Navbar from "../Navbar/Navbar";


import { Secret_key, STRIPE_PUBLISHABLE_KEY } from './keys';
 
// create a component
const CURRENCY = 'GBP';
var CARD_TOKEN = null;


function getCreditCardToken(creditCardData){
  // alert()
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).
  then(response => response.json())
  .catch((error)=>console.log(error))
};
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
 function subscribeUser(creditCardToken){
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};

const Paypall = ({navigation, route}) => {

  const { totalPrice,data } = route.params;
  const dispatch = useDispatch();

  const [CardInput, setCardInput] = React.useState({})
  const [loading, setLoading] = React.useState(false);


  const onSubmit = async () => {
//alert(totalPrice)

    if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
      alert('Invalid Credit Card');
      return false;
    }

    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(CardInput);
      // console.log("creditCardToken", creditCardToken)
      if (creditCardToken.error) {
        alert("creditCardToken error");
        return;
      }
    } catch (e) {
      console.log("e",e);
      return;
    }
    // Send a request to your server with the received credit card token
    setLoading(true)
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      alert(error)
      setLoading(false)
    } else {
     
      let pament_data = await charges();
      console.log('pament_data', pament_data);
      if(pament_data.status == 'succeeded')
      {
        setLoading(false)
        // alert("Payment Successfully")
        AsyncStorage.getItem("hamzaFlawsToken").then((res) => {
          if (!res) {
            return navigation.navigate("Login");
          }
          server
            .post("/checkout", data, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${res}`,
              }, 
            })
            .then((res) => {
              alert('Your Order has been Placed')
              navigation.navigate("Home")
              
              dispatch(EmptyCart());
              // setOrderRef(res.data.data.orderRef);
              // setVisible(true);
              // resetForm({
              //   values: "",
              // });
            })   
            .catch((e) => {
              // setError(true);
              setLoading(false)
              // alert('failed');
              console.log(e);
            });
        });


        
      }
      else{
        alert('Payment failed');
      }
    }
  };

 

  const charges = async () => {

    const card = {
        'amount': 60 , 
        'currency': CURRENCY,
        'source': CARD_TOKEN, 
        'description': "Developers Sin Subscription"
      };

      return fetch('https://api.stripe.com/v1/charges', {
        headers: {
          // Use the correct MIME type for your server
          Accept: 'application/json',
          // Use the correct Content Type to send data to Stripe
          'Content-Type': 'application/x-www-form-urlencoded',
          // Use the Stripe publishable key as Bearer
          Authorization: `Bearer ${Secret_key}`
        },
        // Use a proper HTTP method
        method: 'post',
        // Format the credit card data to a string of key-value pairs
        // divided by &
        body: Object.keys(card)
          .map(key => key + '=' + card[key])
          .join('&')
      }).then(response => response.json());
  };
  


  const _onChange =(data) => {
    setCardInput(data)
  }

  return (
<>
    <Navbar navigation={navigation} />
    {loading ? (
        <ProgressCircle />
      ) : (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2471A3" />
        {/* <Image 
        source={{uri:'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Stripe_logo%2C_revised_2016.png/1200px-Stripe_logo%2C_revised_2016.png'}}
        style={styles.ImgStyle}
        /> */}
        <CreditCardInput 
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        validColor="#fff"
        placeholderColor="#ccc"
        onChange={_onChange} />

    
      <TouchableOpacity 
      onPress={onSubmit}
      style={styles.button}>
        <Text
          style={styles.buttonText}>
          Order Now
        </Text>
      </TouchableOpacity>
    
    </View>
      )}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  ImgStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  button : {
    backgroundColor:'#2471A3',
    width:190,
    height:65,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop:80,
    borderRadius:8
  },
  buttonText : {
    fontSize: 15,
    color: '#f4f4f4',
    fontWeight:'bold',
    textTransform:'uppercase'
  },
  inputContainerStyle : {
    backgroundColor:'#fff',
    borderRadius:5
  },
  inputStyle : {
    backgroundColor:'#222242',
    paddingLeft:15,
    borderRadius:5,
    color:'#fff'
  },
  labelStyle : {
    marginBottom:5,
    fontSize:12
  }
 
});

//make this component available to the app
export default Paypall;

