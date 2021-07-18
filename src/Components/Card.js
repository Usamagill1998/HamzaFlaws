import React from "react";
import { baseUrl } from "../apis/server";
import { View, StyleSheet, Text, Image, TouchableOpacity ,FlatList} from "react-native";

export default function Card({ navigation ,product}) {
  return (


<View >
    <FlatList 
   
    data={product}
    style={{paddingBottom:40}}
		columnWrapperStyle={{justifyContent: 'space-between'}}
    renderItem={({ item }) => {
      return (
        <View style={{width: '48%',}}>
        <View style={style.container}>
        <TouchableOpacity 
          onPress={() => 
            navigation.navigate("detaledPage", {
              id: `${item._id}`,
            })
          }
        >
          <Image
            source={{ uri: item?.imageUrl }}
            resizeMode="cover"
            style={style.imageStyle}
          />
        </TouchableOpacity>
        <View style={style.priceView}>
          <Text style={style.priceText}>
            £ {item.price ? item.price : item.regularPrice}
          </Text>
        </View>
      </View>
      <View style={style.titleView}>
        <Text style={style.titleText}>{item?.title}</Text>
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 12 }}>{item?.category}</Text>
      </View>
      </View>
      );
    }}
   numColumns ={2}
   ListFooterComponent={ <View style={{ margin: 90 }} /> }
  />
</View>



  );
}

const style = StyleSheet.create({
  container: {
     position: "relative",
    borderRadius: 4,
    padding: 10,
    height: 150,
  },
  imageStyle: {
    height: 200,
    width: "100%",
  },
  priceView: {
    position: "absolute",
    bottom: -11,
    left: 10,
    width: 100,
    height: 35,

    // borderBottomLeftRadius: 4,
    borderTopRightRadius: 50,

    borderWidth: 1,
    borderColor: "#f2f2f2",
    backgroundColor: "#f2f2f2",

    justifyContent: "center",
    textAlign: "center",
  },
  priceText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleView: {
    marginTop: 15,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    // textAlign: "center",
  },
});
