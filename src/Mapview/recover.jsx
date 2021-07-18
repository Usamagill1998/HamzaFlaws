import MapView from "react-native-maps";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  AppState,
} from "react-native";
import { point } from "@turf/helpers";
import destination from "@turf/destination";
import * as Location from "expo-location";
import { Permissions } from "expo";

export default function Mapview({ navigation }) {
  let [state, setState] = useState({
    elements: [],
    south: null,
    west: null,
    north: null,
    east: null,
    latitude: 37.78825,
    longitude: -122.4324,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.askAsync(Location.LOCATION);
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied",
        });
      }

      // let { status } = await Location.requestForegroundPermissionsAsync();
      // if (status !== "granted") {
      //   return;
      // }

      let location = await Location.getCurrentPositionAsync({});

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

  const onRegionChangeComplete = (region) => {
    const center = point([region.longitude, region.latitude]);
    const verticalMeter = (111 * region.latitudeDelta) / 2;
    const horizontalMeter = (111 * region.longitudeDelta) / 2;
    const options = { units: "kilometers" };
    const south = destination(center, verticalMeter, 180, options);
    const west = destination(center, horizontalMeter, -90, options);
    const north = destination(center, verticalMeter, 0, options);
    const east = destination(center, horizontalMeter, 90, options);
    setState({
      south: south.geometry.coordinates[1],
      west: west.geometry.coordinates[0],
      north: north.geometry.coordinates[1],
      east: east.geometry.coordinates[0],
    });
  };

  const fetchToilet = async () => {
    const south = state.south;
    const west = state.west;
    const north = state.north;
    const east = state.east;
    const body = `
            [out:json];
            (
                node
                [amenity=kindergarten]
                (${south},${west},${north},${east});

            );
            out;
            `;

    const options = {
      method: "POST",
      body: body,
    };

    try {
      const response = await fetch(
        "https://overpass-api.de/api/interpreter",
        options
      );
      const json = await response.json();

      setState({ elements: json.elements });
    } catch (e) {
      console.log(e);
    }
  };
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
          onRegionChangeComplete={onRegionChangeComplete}
          style={styles.mapView}
          showsUserLocation
          initialRegion={{
            latitude: state.latitude,
            longitude: state.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <MapView.Marker
            coordinate={{ latitude: 52.5200066, longitude: 13.404954 }}
            pinColor="green"
          />
          {/* {state.elements.map((element) => {
            let title = "保育園";
            if (element.tags["name"] !== undefined) {
              title = element.tags["name"];
            }
            return (
              <MapView.Marker
                coordinate={{
                  latitude: element.lat,
                  longitude: element.lon,
                }}
                title={title}
                key={"id_" + element.id}
              />
            );
          })} */}
        </MapView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => fetchToilet()} style={styles.button}>
            <Text style={styles.buttonItem}>Location</Text>
          </TouchableOpacity>
        </View>
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
