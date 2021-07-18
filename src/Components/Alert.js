import * as React from "react";
import { View, Text } from "react-native";
import { Paragraph, Dialog, Portal, Button } from "react-native-paper";

const Alert = ({ visible, setVisible, orderRef, navigation }) => {
  const hideDialog = () => {
    navigation.navigate("Home");

    setVisible(false);
  };
  const handleClose = () => {
    navigation.navigate("Home");
    setVisible(false);
  };
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Thankyou</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Your order Number is{" "}
              <Text
                style={{ color: "#7a58b3", fontWeight: "bold", fontSize: 18 }}
              >
                {orderRef}
              </Text>
              . Your Order Has been Placed
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleClose}>Continue Shopping</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Alert;
