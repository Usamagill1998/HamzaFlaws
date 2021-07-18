import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    // marginBottom: 5,
    // marginTop: 5,
    // borderRadius: 10,
    // borderBottomColor: "#79901f",
    flexDirection: "row",
    alignItems: "center",
    // padding: 20,
  },

  image: {
    resizeMode: "contain",
    width: 60,
    height: 60,
    marginRight: 6,
    marginLeft: 5,
  },

  productInfo: {
    flex: 2,
  },

  name: {
    fontWeight: "bold",
  },
  headline: {
    fontWeight: "bold",
    marginTop: 3,
    marginBottom: 3,
  },
  subHeading: {
    marginBottom: 5,
  },

  productQuantity: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
  },

  icon: {
    color: "black",
  },
  checkout: {
    position: "absolute",
    bottom: 0,
    height: 80,
    width: "100%",
    justifyContent: "center",
  },
});

export default styles;
