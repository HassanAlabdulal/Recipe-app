import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ProfileHeaderProps {
  name: string;
  description: string;
  imageSource: any;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  description,
  imageSource,
}) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={imageSource} style={styles.profileImage} />
      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.profileDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileDescription: {
    fontSize: 16,
    color: "#AAAAAA",
  },
});

export default ProfileHeader;
