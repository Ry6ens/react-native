import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function Registration({ navigation }) {
  const [stateForm, setStateForm] = useState(initialState);
  const [isShowKeyBoard, setShowKeyBoard] = useState(false);

  const onLogin = () => {
    setShowKeyBoard(false);
    Keyboard.dismiss();
    console.log(stateForm);
    setStateForm(initialState);
  };

  const keyboardHide = () => {
    setShowKeyBoard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/Photo_BG.jpg")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyBoard ? -200 : 0,
              }}
            >
              <Text style={styles.title}>Sign Up</Text>

              <TextInput
                style={styles.input}
                inputMode="text"
                placeholder="Login"
                value={stateForm.login}
                onChangeText={(value) => {
                  setStateForm((prevState) => ({ ...prevState, login: value }));
                }}
                onFocus={() => {
                  setShowKeyBoard(true);
                }}
              />
              <TextInput
                style={styles.input}
                inputMode="email"
                placeholder="Email"
                value={stateForm.email}
                onChangeText={(value) => {
                  setStateForm((prevState) => ({ ...prevState, email: value }));
                }}
                onFocus={() => {
                  setShowKeyBoard(true);
                }}
              />
              <TextInput
                style={styles.input}
                inputMode="password"
                placeholder="Password"
                value={stateForm.password}
                onChangeText={(value) => {
                  setStateForm((prevState) => ({
                    ...prevState,
                    password: value,
                  }));
                }}
                secureTextEntry={true}
                onFocus={() => {
                  setShowKeyBoard(true);
                }}
              />

              <TouchableOpacity
                style={styles.btnSignUp}
                activeOpacity={0.8}
                onPress={onLogin}
              >
                <Text style={styles.btnSignUpTitle}>Sign Up</Text>
              </TouchableOpacity>
              <View style={styles.overlayLogIn}>
                <Text style={styles.textQuestion}>
                  Already have an account?
                </Text>
                <Text
                  style={styles.textQuestion}
                  onPress={() => navigation.navigate("Login")}
                >
                  Log In
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    padding: 15,

    borderRadius: "25 25 0 0",

    backgroundColor: "#FFFFFF",
  },
  title: {
    marginTop: 90,
    marginBottom: 15,

    fontFamily: "RobotoMedium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: "0.01em",
  },
  input: {
    marginTop: 15,
    padding: 15,

    height: 50,

    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,

    color: "#212121",

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,

    backgroundColor: "#F6F6F6",
  },
  btnSignUp: {
    marginTop: 40,
    padding: 15,

    alignItems: "center",

    height: 50,

    borderRadius: 100,

    backgroundColor: "#FF6C00",
  },
  btnSignUpTitle: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,

    color: "#FFFFFF",
  },
  overlayLogIn: {
    marginTop: 15,
    marginBottom: 65,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textQuestion: {
    marginRight: 5,

    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,

    textAlign: "center",

    color: "#1B4371",
  },
});
