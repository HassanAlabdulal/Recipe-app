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
            placeholder="hassan@gmail.com"
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
    backgroundColor: "#F6A028",
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    backgroundColor: "#F6A028",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default LoginScreen;
