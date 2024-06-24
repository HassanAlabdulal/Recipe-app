import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Login</Text>

        <Image
          source={require("@/assets/images/loginScreenImage.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.inputContainer}>
          <Icon
            name="mail-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEFCC",
    justifyContent: "center",
    alignItems: "center",
  },
  topSection: {
    backgroundColor: "#FFEFCC",
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    backgroundColor: "white",
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 75,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
  button: {
    backgroundColor: "#FFEFCC",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
