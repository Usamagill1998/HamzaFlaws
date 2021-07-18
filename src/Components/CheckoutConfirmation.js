import React from "react";
import Alert from "./Alert";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import {
  Modal,
  Button,
  Title,
  Subheading,
  Paragraph,
  Portal,
  Provider,
} from "react-native-paper";

const Style = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  column: {
    width: "50%",
  },
  center: {
    textAlign: "center",
  },
});

const MyComponent = ({ visible, setVisible }) => {
  const [alertVisible, setAlertVisible] = React.useState(false);

  const hideModal = () => setVisible(false);
  const containerStyle = {
    // justifyContent: "center",
    // flex: 1,
    backgroundColor: "white",
    padding: 20,
    height: "80%",
    // marginBottom: 80,
    // zIndex: "8987",
  };

  return (
    <>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <ScrollView>
              <View style={Style.row}>
                <View style={Style.column}>
                  <Text style={Style.center}>Product 1</Text>
                </View>
                <View style={Style.column}>
                  <Text style={Style.center}> 30000</Text>
                </View>
              </View>
              <View style={Style.row}>
                <View style={Style.column}>
                  <Text style={Style.center}>Product 1</Text>
                </View>
                <View style={Style.column}>
                  <Text style={Style.center}> 30000</Text>
                </View>
              </View>
            </ScrollView>
            <View style={{ marginBottom: 10 }}>
              <Subheading style={Style.center}>Shipping Information</Subheading>
              <Paragraph style={Style.center}>
                House Number 572 street Fatliaz Colony ferozpure Road Lahore
              </Paragraph>
              <Paragraph style={Style.center}>03084224764</Paragraph>
            </View>
            <View>
              <Title style={Style.center}>Total 2500 Rs</Title>
            </View>

            <Button mode="outlined" onPress={() => setAlertVisible(true)}>
              Order Now
            </Button>
          </Modal>
        </Portal>
      </Provider>
      <Alert visible={alertVisible} setVisible={setAlertVisible} />
    </>
  );
};

export default MyComponent;
