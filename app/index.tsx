import React from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.imageOuterBorder}>
            <View style={styles.imageBorder}>
              <Image
                source={require("@/assets/images/loginScreenImage.png")}
                style={styles.image}
              />
            </View>
          </View>
          <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.bottomSection}>
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
            />
          </View>
          <Link href="/home" asChild>
            <Pressable style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
          </Link>
          <Link href="/signUp" asChild>
            <Pressable style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#F6A028",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  topSection: {
    backgroundColor: "#F6A028",
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    backgroundColor: "white",
    width: "100%",
    height: "50%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  imageBorder: {
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 15,
  },
  imageOuterBorder: {
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 20,
    marginTop: 20,
  },
  image: {
    width: 145,
    height: 145,
    overflow: "visible",
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 15,
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
    letterSpacing: 1,
  },
  signUpButton: {
    width: "90%",
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 8,
  },
  signUpButtonText: {
    fontSize: 14,
    textDecorationLine: "underline",
    letterSpacing: 1,
  },
});

export default LoginScreen;
