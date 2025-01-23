import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

const profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    username: "",
  });

  // getting username and profile
  useEffect(() => {
    const fetchUserName = async () => {
      const user = await AsyncStorage.getItem("DoorVue");
      if (user) {
        const data = JSON.parse(user);
        setUserData(data);
      }
    };

    fetchUserName();
  }, []);

  // for logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("DoorVue");
    router.push("/signin");
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/1.jpg",
            }}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.nameText}>{userData?.username || "Guest"}</Text>
        <Text style={styles.emailText}>{userData?.email || "Guest"}</Text>

        <TouchableOpacity style={styles.editProfileButton}>
          <Ionicons name="create-outline" color="white" size={16} />
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* action buttons for future */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            Alert.alert("Coming soon");
          }}
        >
          <Ionicons name="key-outline" color="blue" size={20} />
          <Text style={styles.actionButtonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            Alert.alert("Coming soon");
          }}
        >
          <Ionicons name="bookmark-outline" color="blue" size={20} />
          <Text style={styles.actionButtonText}>Save Property</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" color="white" size={20} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "gray",
  },

  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  emailText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "royalblue",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  editProfileText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "600",
  },
  actionContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  actionButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "blue",
  },
  logoutButton: {
    backgroundColor: "red",
  },
  logoutButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});

export default profile;
