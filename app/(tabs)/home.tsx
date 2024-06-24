import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const homeScreen = () => {
  <View style={styles.container}>
    <Text style={styles.text}>Hassan al</Text>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 24,
  },
});

export default homeScreen;
