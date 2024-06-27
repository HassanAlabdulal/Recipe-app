import React, { useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebaseConfig";
import LottieView from "lottie-react-native";
import CustomAlert from "../components/CustomAlert";
import { getErrorMessage } from "../utils/firebaseErrorMessages";

const LoginScreen = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      try {
        const auth = getAuth(app);
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/home");
      } catch (error: any) {
        const errorMessage = getErrorMessage(error.code);
        setAlertTitle("Error");
        setAlertMessage(errorMessage);
        setAlertVisible(true);
      }
    } else {
      setAlertTitle("Error");
      setAlertMessage("Please fill in all fields");
      setAlertVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.topSection}>
            <View style={styles.animationOuterBorder}>
              <View style={styles.animationBorder}>
                <LottieView
                  source={require("../assets/animations/food-animation.json")}
                  autoPlay
                  loop
                  style={styles.animation}
                />
              </View>
            </View>
            <Text style={styles.title}>Login</Text>
          </View>

          <ScrollView
            contentContainerStyle={[
              styles.bottomSection,
              isInputFocused && styles.bottomSectionFocused,
            ]}
          >
            <View style={styles.inputWrapper}>
              <Text style={styles.inputText}>Email</Text>
              <View style={styles.inputContainer}>
                <Icon
                  name="mail-outline"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="hassan@lazywait.com"
                  style={styles.input}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </View>
              <Text style={styles.inputText}>Password</Text>
              <View style={styles.inputContainer}>
                <Icon
                  name="lock-closed-outline"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="********"
                  style={styles.input}
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </View>
            </View>

            <Pressable onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
            <Link href="/signUp" asChild>
              <Pressable style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>
                  Don't have an account? Sign Up
                </Text>
              </Pressable>
            </Link>
          </ScrollView>

          <CustomAlert
            title={alertTitle}
            message={alertMessage}
            visible={alertVisible}
            onClose={() => setAlertVisible(false)}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6A028",
  },
  topSection: {
    backgroundColor: "#F6A028",
    width: "100%",
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    backgroundColor: "white",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 20,
  },
  bottomSectionFocused: {
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  animationBorder: {
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 15,
  },
  animationOuterBorder: {
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 20,
    marginTop: 20,
  },
  animation: {
    width: 145,
    height: 145,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
    marginTop: 15,
  },
  inputWrapper: {
    width: "100%",
    alignItems: "center",
  },
  inputText: {
    width: "90%",
    marginLeft: 8,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4FA",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "90%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#F6A028",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },
  signUpButton: {
    width: "90%",
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 8,
  },
  signUpButtonText: {
    fontSize: 14,
    textDecorationLine: "underline",
    letterSpacing: 1,
  },
});

export default LoginScreen;
