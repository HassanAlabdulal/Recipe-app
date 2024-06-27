import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ProfileHeaderProps {
  name: string;
  age: number;
  bio: string;
  location: string;
  imageSource: any;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  age,
  bio,
  location,
  imageSource,
}) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={imageSource} style={styles.profileImage} />
      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.profilebio}>{age}</Text>
      <Text style={styles.profilebio}>{bio}</Text>
      <Text style={styles.profilebio}>{location}</Text>
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
  profilebio: {
    fontSize: 16,
    color: "#AAAAAA",
  },
});

export default ProfileHeader;
