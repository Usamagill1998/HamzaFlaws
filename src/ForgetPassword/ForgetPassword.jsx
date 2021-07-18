import React, { useState } from "react";
import server from "../apis/server";
import ProgressCircle from "../Components/CircularProgress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import { View, Text } from "react-native";
import Navbar from "../Navbar/Navbar";
import { TextInput, Avatar, Button, Caption } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";

export default function ForgetPassword({ navigation }) {
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  let validationSchema = yup.object({
    email: yup.string().email().required("email is required"),
  });

  const handleForgetPassword = async (values, resetForm) => {
    try {
      setLoading(true);
      const { data } = await server.post("/forgetPassword", values);
      await AsyncStorage.setItem(
        "hamzaFlawsForgetPasswordToken",
        JSON.stringify(data.token)
      );
      console.log(data);
      navigation.navigate("confirmForgetPassword", {
        email: `${values.email}`,
      });

      setLoading(false);
      alert("An email has been Sent to your account Check your email");
      resetForm({
        values: "",
      });
    } catch (e) {
      setLoading(false);
      console.log(e);
      alert("you have entered wrong email");
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
          <Caption>We will send you an email with</Caption>
          <Caption>the code to verify it's you</Caption>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleForgetPassword(values, resetForm);
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

                <Button
                  style={{ marginTop: 5, borderRadius: 50 }}
                  mode="contained"
                  onPress={formikProps.handleSubmit}
                  type="submit"
                >
                  Send Email
                </Button>
              </>
            )}
          </Formik>
        </View>
      )}
    </>
  );
}
