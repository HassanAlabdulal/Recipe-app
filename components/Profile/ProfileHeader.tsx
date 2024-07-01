import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";

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
    <View style={styles.headerWrapper}>
      <Animatable.View
        animation="slideInDown"
        easing="ease-in-out"
        style={styles.headerContainer}
      >
        <Image source={imageSource} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileBio}>{bio}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.iconWrapper}>
              <Icon
                name="location-outline"
                size={16}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.profileInfo}>{location}</Text>
            </View>
            <View style={styles.iconWrapper}>
              <Icon
                name="calendar-outline"
                size={16}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.profileInfo}>{age} years</Text>
            </View>
          </View>
        </View>
      </Animatable.View>
      <View style={styles.statsContainer}>
        <Animatable.View
          animation="fadeInUp"
          delay={300}
          style={styles.statItem}
        >
          <Text style={styles.statNumber}>122</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </Animatable.View>
        <Animatable.View
          animation="fadeInUp"
          delay={600}
          style={styles.statItem}
        >
          <Text style={styles.statNumber}>67</Text>
          <Text style={styles.statLabel}>Following</Text>
        </Animatable.View>
        <Animatable.View
          animation="fadeInUp"
          delay={900}
          style={styles.statItem}
        >
          <Text style={styles.statNumber}>12K</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </Animatable.View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.followButton]}>
          <Text style={styles.followText}>Add Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: "#F6A028",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 30,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  textContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  profileBio: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileInfo: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 2,
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 1,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 14,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F6A028",
  },
  followButton: {
    backgroundColor: "#F6A028",
    borderWidth: 1,
    borderColor: "#fff",
  },
  followText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ProfileHeader;
