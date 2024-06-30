// screens/SignUpScreen.tsx
import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebaseConfig";
import CustomAlert from "../components/CustomAlert";
import { getErrorMessage } from "../utils/firebaseErrorMessages";
import InputField from "../components/login/InputField";
import Button from "../components/login/Button";
import AnimatedHeader from "../components/login/AnimatedHeader";

const SignUpScreen = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const router = useRouter();

  const handleSignUp = async () => {
    if (email && password) {
      try {
        const auth = getAuth(app);
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/createProfile");
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
          <AnimatedHeader title="Sign Up" />
          <ScrollView
            contentContainerStyle={[
              styles.bottomSection,
              isInputFocused && styles.bottomSectionFocused,
            ]}
          >
            <InputField
              icon="mail-outline"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <InputField
              icon="lock-closed-outline"
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <Button title="Next" onPress={handleSignUp} />
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
});

export default SignUpScreen;
