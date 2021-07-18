import React, { useState } from "react";
import server from "../apis/server";
import ProgressCircle from "../Components/CircularProgress";
import { useDispatch } from "react-redux";
import { signIn } from "../Actions";
import { View, Text } from "react-native";
import Navbar from "../Navbar/Navbar";
import { TextInput, Avatar, Button, Caption } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
// import { useState } from "react";

export default function Signin({ navigation }) {
  let [passwordType, setPasswordType] = React.useState(true);
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    if (passwordType) {
      setPasswordType(false);
    } else {
      setPasswordType(true);
    }
  };

  let validationSchema = yup.object({
    email: yup.string().email().required("email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleSignin = async (values, resetForm) => {
    try {
      setLoading(true);
      const { data } = await server.post("/login", values);

      dispatch(signIn(data.user, data.token, navigation));

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
          <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 10 }}>
            SIGN IN
          </Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSignin(values, resetForm);
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

                <Caption onPress={() => navigation.navigate("Signup")}>
                  Don't have an account? Sign up"
                </Caption>
                <Caption onPress={() => navigation.navigate("forgetPassword")}>
                  Forget Password
                </Caption>
                <Button
                  style={{ marginTop: 10, borderRadius: 50 }}
                  mode="contained"
                  onPress={formikProps.handleSubmit}
                  type="submit"
                >
                  Signin
                </Button>
              </>
            )}
          </Formik>
        </View>
      )}
    </>
  );
}
