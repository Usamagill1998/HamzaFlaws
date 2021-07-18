import MapView from "react-native-maps";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
// import { point } from "@turf/helpers";
// import destination from "@turf/destination";
import MapViewDirection from "react-native-maps-directions";
import * as Location from "expo-location";

export default function Mapview({ navigation }) {
  let [toLcation, setToLocation] = useState({
    latitude: 31.4475,
    longitude: 74.3081,
  });

  let [region, setRegion] = useState({
    latitude: 51.511957, 
    longitude: -0.381855,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  let [state, setState] = useState({
    elements: [],
    south: null,
    west: null,
    north: null,
    east: null,
    latitude: 51.511957,
    longitude: -0.381855,
  });

  useEffect(() => {
    (async () => {
      // let { status } = await Permissions.askAsync(Permissions.LOCATION);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("location not granted");
      }

      let location = await Location.getCurrentPositionAsync({});
      let mapRegion = {
        latitude: (location.coords.latitude + toLcation.latitude) / 2,
        longitude: (location.coords.longitude + toLcation.longitude) / 2,
        latitudeDelta:
          Math.abs(location.coords.latitude + toLcation.latitude) * 2,
        longitudeDelta:
          Math.abs(location.coords.longitude + toLcation.longitude) * 2,
      };
      setRegion(mapRegion);
      updateState(location);
    })();
  }, []);

  const updateState = (location) => {
    setState({
      ...state,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const onRegionChange = (region) => {
    setRegion(region);
  };

  // const fetchToilet = async () => {
  //   const south = state.south;
  //   const west = state.west;
  //   const north = state.north;
  //   const east = state.east;
  //   const body = `
  //           [out:json];
  //           (
  //               node
  //               [amenity=kindergarten]
  //               (${south},${west},${north},${east});

  //           );
  //           out;
  //           `;

  //   const options = {
  //     method: "POST",
  //     body: body,
  //   };

  //   try {
  //     const response = await fetch(
  //       "https://overpass-api.de/api/interpreter",
  //       options
  //     );
  //     const json = await response.json();

  //     setState({ elements: json.elements });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const origin1 = {latitude: region.latitude, longitude: region.longitude};



const destination1 = {latitude: 51.511957, longitude: -0.381855};
  return (
    <> 
      <Navbar navigation={navigation} />

      {/* <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View> */}
      <View style={styles.container}>
        <MapView
          // onRegionChange={onRegionChange}
          style={styles.mapView}
          showsUserLocation={true}
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: state.latitude,
              longitude: state.longitude,
            }}
            pinColor="green"
          />
          <MapView.Marker coordinate={toLcation} pinColor="green" />

          <MapViewDirection
            origin={origin1}
            destination={destination1}
            strokeWidth={5}
            apikey="AIzaSyC1c93iM2wAxyEFbrSq86Z7mh2FN7_gEPk"
            strokeColor={"red"}
          />
        </MapView>
      </View>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  mapView: {
    ...StyleSheet.absoluteFillObject,
  },

  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
    alignItems: "center",
  },

  button: {
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,235,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },

  buttonItem: {
    textAlign: "center",
  },
});
