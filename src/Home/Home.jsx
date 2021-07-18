import React, { useState, useEffect } from "react";
import FlatListSlider from '../FlatListSlider';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Text, View, SafeAreaView, ScrollView, StyleSheet ,FlatList,TouchableOpacity,Dimensions} from "react-native";
import ProgressCircle from "../Components/CircularProgress";
import Navbar from "../Navbar/Navbar";
import Filter from "../Components/Filter";
import ProductCard from "../Components/Card";
import { useSelector, useDispatch } from "react-redux";

import { fetchProducts } from "../Actions";

export default function Home({ navigation }) {

  AsyncStorage.getItem("hamzaFlawsUser").then((res) => {

    const user =  JSON.parse(res)
    //  alert(JSON.stringify(user))   

  })
  const screenWidth = Math.round(Dimensions.get('window').width);

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

 const  data = [

    {
      image:
      'https://hamzaflavas.co.uk/wp-content/uploads/2021/06/1.jpg',
      desc: 'Silent Waters in the mountains in midst of Himilayas',
    },
    {
      image:
'https://hamzaflavas.co.uk/wp-content/uploads/2021/06/2.jpg',
      desc:
        'Red fort in India New Delhi is a magnificient masterpeiece of humans',
    },
    {
      image:
        'https://hamzaflavas.co.uk/wp-content/uploads/2021/06/3.jpg',
      desc:
        'Sample Description below the image for representation purpose only',
    },
    {
      image:
        'https://hamzaflavas.co.uk/wp-content/uploads/2021/06/4.jpg',
      desc:
        'Sample Description below the image for representation purpose only',
    },
   
  ] 


  const products = useSelector((state) => state.posts);
  let [filteredProduct, setFilteredProduct] = useState();
  let [loading, setLoading] = useState(true);
  let [category, setCategory] = useState({ id: 0, name: "All" });

  const dispatch = useDispatch(); 
  // useEffect(() => {
  //   setLoading(true);
  //   setFilteredProduct([...products]);
  // }, [products]);
  useEffect(() => {
    setLoading(false);
    dispatch(fetchProducts(setLoading, setFilteredProduct));
    // alert(JSON.stringify(fetchProducts))
  }, []);


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
    //  alert(JSON.stringify(...prodArray))
    setFilteredProduct(prodArray);
  }    
  };


  return (
    <>
    
      <Navbar navigation={navigation} />
      <SafeAreaView style={style.container}>
 
        
      <FlatListSlider
            data={data}
            timer={7000}
            imageKey={'image'}
            width={screenWidth}
            separator={0} 
            loop={true}
            // autoscroll={true}
            // currentIndexCallback={index => console.log('Index', index)}
            indicator
            animation
            height={170} 
          />  


        <View style={style.headingText}>
          {/* <Text style={style.headingText}>Main</Text> */}
          <Text style={style.headingText}>Categories</Text>
        </View>
        {/* <Filter
          // filteredProduct={filteredProduct}
          setFilteredProduct={setFilteredProduct}
          products={products}
        /> */}



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

        {loading ? (
          <ProgressCircle />
        ) : ( 
          <>


            {/* <ScrollView>
              {filteredProduct?.length === 0 ? (
                <Text>Product of this category have sold</Text>
              ) : (
                filteredProduct?.map((product,i) => (
                  <ProductCard key={product._id} navigation={navigation} product={product} />
                ))
              )}
            </ScrollView> */}

            <ProductCard  navigation={navigation} product={filteredProduct} />
          </> 
        )}
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    backgroundColor: "white",
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
  },
});
