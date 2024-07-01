import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import { Link } from "expo-router";

interface HeaderProps {
  animatedValue: Animated.Value;
  userName: string | null;
}

const Header: React.FC<HeaderProps> = ({ animatedValue, userName }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeftSide}>
        <Text style={styles.greeting}>Hello,</Text>
        <Animated.Text
          style={[
            styles.name,
            {
              transform: [{ translateX: animatedValue }],
            },
          ]}
        >
          {userName ? userName : ""}👋
        </Animated.Text>
      </View>
      <Link href="/profile" asChild>
        <Pressable>
          <Image
            style={styles.profileImage}
            source={require("../../assets/images/profile.png")}
          />
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeftSide: {
    flexDirection: "row",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "normal",
    color: "#666",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 4,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: "auto",
  },
});

export default Header;
