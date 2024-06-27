import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

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
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.profileName}>{name}</Text>
          <Icon
            name="checkmark-circle"
            size={16}
            color="#000"
            style={styles.verifiedIcon}
          />
        </View>
        <Text style={styles.profileBio}>{bio}</Text>
        <View style={styles.infoContainer}>
          <Icon
            name="calendar-outline"
            size={16}
            color="#F6A028"
            style={styles.icon}
          />
          <Text style={styles.profileInfo}>{age} years</Text>
          <Icon
            name="location-outline"
            size={16}
            color="#F6A028"
            style={[styles.icon, styles.locationIcon]}
          />
          <Text style={styles.profileInfo}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
    marginTop: 32,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  verifiedIcon: {
    marginLeft: 5,
  },
  profileBio: {
    fontSize: 16,
    color: "#777",
    marginVertical: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  icon: {
    marginRight: 5,
  },
  locationIcon: {
    marginLeft: 10,
  },
  profileInfo: {
    fontSize: 16,
    color: "#555",
  },
});

export default ProfileHeader;
