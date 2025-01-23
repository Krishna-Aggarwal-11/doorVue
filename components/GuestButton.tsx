import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const GuestButton = () => {
  const router = useRouter();
  const handleGuest = async () => {
    await AsyncStorage.removeItem("DoorVue");
    await AsyncStorage.setItem(
      "DoorVue",
      JSON.stringify({
        email: "test@example.com",
        password: "password",
        username: "Guest",
      })
    );
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.guestContainer}>
      <Text style={styles.guestText}>Just browsing? </Text>
      <Link href="/(tabs)" asChild>
        <TouchableOpacity onPress={handleGuest}>
          <Text style={styles.guestLink}>Continue as Guest</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  guestContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  guestText: {
    color: "#666",
    fontSize: 14,
  },
  guestLink: {
    color: "#4A90E2",
    fontWeight: "700",
    fontSize: 14,
  },
});

export default GuestButton;
