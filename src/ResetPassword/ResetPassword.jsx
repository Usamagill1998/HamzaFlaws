import React, { useState } from "react";
import { View, Text } from "react-native";
import server from "../apis/server";
import Navbar from "../Navbar/Navbar";
import ProgressCircle from "../Components/CircularProgress";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch } from "react-redux";

import { TextInput, Button, Caption } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";

export default function ResetPassword({ route, navigation }) {
  const dispatch = useDispatch();
  const { email } = route.params;
  let [passwordType, setPasswordType] = React.useState(true);
  let [confirmPasswordType, setConfirmPasswordType] = React.useState(true);
  let [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => {
    if (passwordType) {
      setPasswordType(false);
    } else {
      setPasswordType(true);
    }
  };

  const handleClickShowConfirmPassword = () => {
    if (confirmPasswordType) {
      setConfirmPasswordType(false);
    } else {
      setConfirmPasswordType(true);
    }
  };

  let validationSchema = yup.object({
    email: yup.string().email().required("email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("confirm your password"),
  });

  const handleResetPassword = async (values, resetForm) => {
    try {
      setLoading(true);
      let forgetToken = await AsyncStorage.getItem(
        "hamzaFlawsForgetPasswordToken"
      );
      let decodedToken = JSON.parse(forgetToken);

      await server.post(
        "/setNewPassword",
        {
          email: values.email,
          password: values.password,
          passwordToken: decodedToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await AsyncStorage.removeItem("hamzaFlawsForgetPasswordToken");
      resetForm({
        values: "",
      });
      navigation.navigate("Login");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
      alert("your code has expired! get the latest code and try again");
      navigation.navigate("forgetPassword");
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
          <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 10 }}>
            RESET PASSWORD
          </Text>

          {/* <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 10 }}>
            RESET YOUR PASSWORD
          </Text> */}

          <Formik
            initialValues={{ email: email, password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleResetPassword(values, resetForm);
            }}
          >
            {(formikProps) => (
              <>
                <TextInput
                  id="email"
                  name="email"
                  label="Email"
                  mode="outlined"
                  disabled
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

                <TextInput
                  id="password"
                  name="password"
                  label="Password"
                  mode="outlined"
                  dense
                  value={formikProps.values.password}
                  onChangeText={formikProps.handleChange("password")}
                  secureTextEntry={passwordType}
                  style={{ width: "95%" }}
                  right={
                    <TextInput.Icon
                      name={passwordType ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      onPress={handleClickShowPassword}
                    />
                  }
                  onBlur={formikProps.handleBlur("password")}
                  error={
                    formikProps.errors.password && formikProps.touched.password
                      ? true
                      : false
                  }
                />

                <View style={{ width: "95%" }}>
                  {formikProps.errors.password &&
                  formikProps.touched.password ? (
                    <Caption
                      style={{
                        color: "red",
                      }}
                    >
                      {formikProps.errors.password}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>

                <TextInput
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  mode="outlined"
                  dense
                  secureTextEntry={confirmPasswordType}
                  value={formikProps.values.confirmPassword}
                  onChangeText={formikProps.handleChange("confirmPassword")}
                  style={{ width: "95%" }}
                  right={
                    <TextInput.Icon
                      name={
                        confirmPasswordType ? "eye-outline" : "eye-off-outline"
                      }
                      size={20}
                      onPress={handleClickShowConfirmPassword}
                    />
                  }
                  onBlur={formikProps.handleBlur("confirmPassword")}
                  error={
                    formikProps.errors.confirmPassword &&
                    formikProps.touched.confirmPassword
                      ? true
                      : false
                  }
                  // eye-off-outline
                />
                <View style={{ width: "95%" }}>
                  {formikProps.errors.confirmPassword &&
                  formikProps.touched.confirmPassword ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.confirmPassword}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>
                <Caption onPress={() => navigation.navigate("Login")}>
                  Already have an account? Signin"
                </Caption>
                <Button
                  style={{ marginTop: 10, borderRadius: 50 }}
                  mode="contained"
                  onPress={formikProps.handleSubmit}
                  type="submit"
                >
                  RESET PASSWORD
                </Button>
              </>
            )}
          </Formik>
        </View>
      )}
    </>
  );
}
