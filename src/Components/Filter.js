import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const categoryList = [
  { id: 0, name: "All" },
  { id: 1, name: "Ice Cream -Scoop" },
  { id: 2, name: "Ice Cream - Karen's Kulfi" },
  { id: 3, name: "HAMZA SPECIAL TEA" },
  { id: 4, name: "PAAN" },
  { id: 5, name: "FOOD" },
  { id: 6, name: "Ice Cream - Tubs" },
  { id: 7, name: "FALOODA" },
  { id: 8, name: "SHAKES" },
  { id: 9, name: "HAMZA SPECIAL JUICE" },
  { id: 10, name: "FRESH JUICES" },
  { id: 11, name: "SOUP" },
  { id: 12, name: "CHAAT" },
  { id: 13, name: "All" },
  { id: 14, name: "Ice Cream -Scoop" },
];

export default function Filter({ setFilteredProduct, products }) {
  let [category, setCategory] = useState({ id: 0, name: "All" });

  const handleFilter = (item) => {
    setCategory(item);
    if (item.name === "All") {
      return setFilteredProduct(products);
    }
    else{
    let prodArray = [];
    for (let prods of products) {
      if (prods.category === item.name) {
        // alert(JSON.stringify(prods))
        prodArray.push(prods);
      }
    }

    setFilteredProduct([...prodArray]);
  }
  };
  return (
    <View style={{ height: 40, justifyContent: "center", marginTop: 10 }}>
      <FlatList
        data={categoryList}
        style={{ flex: 2 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ height: "100%" }}
              onPress={() => handleFilter(item)}
              key={item.id}
            >
              <View
                Type="string"
                style={{
                  borderWidth: 1,
                  borderColor: category.id === item.id ? "#79901f" : "#f2f2f2",
                  backgroundColor:
                    category.id === item.id ? "#79901f" : "#f2f2f2",
                  borderRadius: 50,
                  // color: "white",
                  // padding: 5,
                  paddingTop: 6,
                  paddingLeft: 10,
                  paddingBottom: 6,
                  paddingRight: 10,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: category.id === item.id ? "white" : "black",
                    fontSize: 14,
                    justifyContent: "center",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const style = StyleSheet.create({});
