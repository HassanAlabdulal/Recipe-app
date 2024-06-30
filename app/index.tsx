import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require("../assets/animations/welcome.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.storeText}>180K Recipes</Text>
        <Text style={styles.title}>Explore The Most Delicious Foods</Text>
        <Link href="/signIn" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 32,
  },
  animation: {
    width: width * 0.8,
    height: height * 0.4,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  storeText: {
    fontSize: 18,
    color: "#888",
    textAlign: "left",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#F6A028",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
