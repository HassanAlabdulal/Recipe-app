import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const AnimatedHeader = () => {
  return (
    <View style={styles.topSection}>
      <View style={styles.animationOuterBorder}>
        <View style={styles.animationBorder}>
          <LottieView
            source={require("../../assets/animations/food-animation.json")}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
      </View>
      <Text style={styles.title}>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    backgroundColor: "#F6A028",
    width: "100%",
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
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
});

export default AnimatedHeader;
