import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { app, db } from "@/firebaseConfig";
import CustomAlert from "../components/CustomAlert";
import { getErrorMessage } from "../utils/firebaseErrorMessages";
import InputField from "../components/login/InputField";
import Button from "../components/login/Button";
import AnimatedHeader from "../components/login/AnimatedHeader";

const CreateProfileScreen = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [navigateAfterAlert, setNavigateAfterAlert] = useState(false);

  const router = useRouter();

  const handleProfileCreation = async () => {
    if (name && age && bio && location) {
      try {
        const auth = getAuth(app);
        const user = auth.currentUser;
        if (user) {
          await setDoc(doc(db, "users", user.uid), {
            name,
            age,
            bio,
            location,
            favorites_recipes: [],
          });
          setAlertTitle("Success!");
          setAlertMessage("Your profile has been created successfully! 🎉");
          setAlertVisible(true);
          setNavigateAfterAlert(true);
        }
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

  const handleCloseAlert = () => {
    setAlertVisible(false);
    if (navigateAfterAlert) {
      setNavigateAfterAlert(false);
      router.push("/home");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <AnimatedHeader title="Create Profile" />
        <ScrollView
          contentContainerStyle={[
            styles.bottomSection,
            isInputFocused && styles.bottomSectionFocused,
          ]}
          showsVerticalScrollIndicator={false}
        >
          <InputField
            icon="person-outline"
            placeholder="Name"
            value={name}
            onChangeText={setName}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <InputField
            icon="calendar-outline"
            placeholder="Enter your age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <InputField
            icon="information-circle-outline"
            placeholder="A brief bio about yourself"
            value={bio}
            onChangeText={setBio}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <InputField
            icon="location-outline"
            placeholder="Enter your location"
            value={location}
            onChangeText={setLocation}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <Button title="Create Profile" onPress={handleProfileCreation} />
        </ScrollView>
        <CustomAlert
          title={alertTitle}
          message={alertMessage}
          visible={alertVisible}
          onClose={handleCloseAlert}
        />
      </View>
    </TouchableWithoutFeedback>
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
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  bottomSectionFocused: {
    justifyContent: "flex-start",
    paddingTop: 40,
  },
});

export default CreateProfileScreen;
