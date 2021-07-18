import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import server from "../apis/server";
import { useSelector } from "react-redux";
import { ScrollView, View, Text ,Keyboard,TouchableWithoutFeedback } from "react-native";
import Navbar from "../Navbar/Navbar";
import { DataTable, Badge } from "react-native-paper";
import Box from "../Components/Box";
import ProgressCircle from "../Components/CircularProgress";
const Order = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

 
 
 // alert(JSON.stringify(user))
  useEffect(() => {
    AsyncStorage.getItem("hamzaFlawsToken") 
      .then((res) => {
        const token = res;

        if (!token) {
          return navigation.navigate("Login");
        }
        else{
          alert('call')
        setLoading(true);  
        // if (!loaded) {
          // alert('called')
        
            //  alert(JSON.stringify(user)) 

let user1={
  userID :user.user._id
}
          server 
            .post("/orders/mine",user1, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }, 
            })
            .then((res) => {
              setLoading(false);

              setOrders([...res.data]);
            })
            .catch((e) => console.log(e.message));
            setLoading(false)
          // setLoaded();
        // }
      
    }
  })
     
//   }, []); 

},[])

  return (
    <>
      <Navbar navigation={navigation} />
      {loading ? (
        <ProgressCircle />
      ) : (
        <ScrollView style={{ backgroundColor: "white" }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Order #</DataTable.Title>
              <DataTable.Title>Order Date</DataTable.Title>

              <DataTable.Title numeric>Total Bill</DataTable.Title>
              <DataTable.Title numeric>Order Type</DataTable.Title>

              <DataTable.Title numeric>status</DataTable.Title>
            </DataTable.Header>
            {orders.length === 0 ? (
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Box message="Your have not ordered anything yet" />
              </View>
            ) : (
              orders.map((order, index) => {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell> {index}</DataTable.Cell>
                    <DataTable.Cell>
                      {order.createdAt}
                    </DataTable.Cell>

                    <DataTable.Cell numeric>{order.total} £</DataTable.Cell>
                    <DataTable.Cell numeric>{order.deliveryType} </DataTable.Cell>

                    <DataTable.Cell numeric>
                      <View
                        Type="string"
                        style={{
                          borderWidth: 1,
                          borderColor: "#79901f",
                          backgroundColor: "#79901f",
                          borderRadius: 4,
                          // color: "white",
                          padding: 5,
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 8 }}>
                          {order.status.toUpperCase()}
                        </Text>
                      </View>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })
            )}
          </DataTable>
        </ScrollView>
      )}
    </>
  );
};

export default Order;
