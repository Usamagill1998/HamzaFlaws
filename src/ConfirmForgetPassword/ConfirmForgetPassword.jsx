import React, { useState } from "react";
import server from "../apis/server";
import ProgressCircle from "../Components/CircularProgress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
// import { signIn } from "../Actions";
import { View, Text } from "react-native";
import Navbar from "../Navbar/Navbar";
import { TextInput, Avatar, Button, Caption } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
// import { useState } from "react";

export default function ConfirmForgetPassword({ route, navigation }) {
  let [passwordType, setPasswordType] = React.useState(true);
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { email } = route.params;
  let validationSchema = yup.object({
    email: yup.string().email().required("email is required"),
    code: yup.number().required("enter the verification code"),
  });
  // 91112
  const handleVerificationCode = async (values, resetForm) => {
    try {
      setLoading(true);
      let token = await AsyncStorage.getItem("hamzaFlawsForgetPasswordToken");
      let decodedToken = JSON.parse(token);

      if (decodedToken === values.code) {
        navigation.navigate("resetPassword", {
          email: `${values.email}`,
        });
      } else {
        alert("You have entered the wrong code");
      }
      resetForm({
        values: "",
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
      alert("you have entered wrong email or password");
    }
  };

  return (
    <>
      <Navbar navigation={navigation} />

      {loading ? (
        <ProgressCircle />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 5 }}>
            FORGET PASSWORD
          </Text>
          <Caption>
            Enter the verification code sent to your email account
          </Caption>
          <Caption>to verify it's you</Caption>
          <Formik
            initialValues={{ email: email, code: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleVerificationCode(values, resetForm);
            }}
          >
            {(formikProps) => (
              <>
                <TextInput
                  id="email"
                  name="email"
                  label="Email"
                  mode="outlined"
                  dense
                  disabled
                  value={formikProps.values.email}
                  onChangeText={formikProps.handleChange("email")}
                  style={{ width: "95%" }}
                  onBlur={formikProps.handleBlur("email")}
                  error={
                    formikProps.errors.email && formikProps.touched.email
                      ? true
                      : false
                  }
                />
                <View style={{ width: "95%" }}>
                  {formikProps.errors.email && formikProps.touched.email ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.email}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>

                <TextInput
                  id="code"
                  name="code"
                  label="code"
                  mode="outlined"
                  dense
                  value={formikProps.values.code}
                  onChangeText={formikProps.handleChange("code")}
                  style={{ width: "95%" }}
                  onBlur={formikProps.handleBlur("code")}
                  error={
                    formikProps.errors.code && formikProps.touched.code
                      ? true
                      : false
                  }
                />
                <View style={{ width: "95%" }}>
                  {formikProps.errors.code && formikProps.touched.code ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.code}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>
                <Button
                  style={{ marginTop: 5, borderRadius: 50 }}
                  mode="contained"
                  onPress={formikProps.handleSubmit}
                  type="submit"
                >
                  Confirm
                </Button>
              </>
            )}
          </Formik>
        </View>
      )}
    </>
  );
}
