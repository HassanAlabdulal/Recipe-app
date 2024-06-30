import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";

import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { app, db } from "@/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import CustomAlert from "../components/CustomAlert";
import { getErrorMessage } from "../utils/firebaseErrorMessages";

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
    <ScrollView style={{ flex: 1 }}>
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
          </View>

          <ScrollView
            contentContainerStyle={[
              styles.bottomSection,
              isInputFocused && styles.bottomSectionFocused,
            ]}
          >
            <View style={styles.inputWrapper}>
              <Text style={styles.inputText}>Name</Text>
              <View style={styles.inputContainer}>
                <Icon
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Hassan Alabdulal"
                  style={styles.input}
                  keyboardType="default"
                  value={name}
                  onChangeText={(text) => setName(text)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </View>

              <Text style={styles.inputText}>Age</Text>
              <View style={styles.inputContainer}>
                <Icon
                  name="calendar-outline"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter your age"
                  style={styles.input}
                  keyboardType="numeric"
                  value={age}
                  onChangeText={(text) => setAge(text)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </View>

              <Text style={styles.inputText}>Bio</Text>
              <View style={styles.inputContainer}>
                <Icon
                  name="information-circle-outline"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="A brief bio about yourself"
                  style={styles.input}
                  keyboardType="default"
                  value={bio}
                  onChangeText={(text) => setBio(text)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </View>

              <Text style={styles.inputText}>Location</Text>
              <View style={styles.inputContainer}>
                <Icon
                  name="location-outline"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter your location"
                  style={styles.input}
                  keyboardType="default"
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleProfileCreation}
              style={styles.Button}
            >
              <Text style={styles.ButtonText}>Create Profile</Text>
            </TouchableOpacity>
          </ScrollView>

          <CustomAlert
            title={alertTitle}
            message={alertMessage}
            visible={alertVisible}
            onClose={handleCloseAlert}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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
    height: "35%",
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
  Button: {
    backgroundColor: "#F6A028",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  ButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },
});

export default CreateProfileScreen;
