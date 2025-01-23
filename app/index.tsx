import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import GuestButton from "@/components/GuestButton";
import SignUpText from "@/components/SignUpText";

const Welcome = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/welcome.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      {/* Text Container with SignIn , SignUp and Guest Button */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>DoorVue</Text>
        <Text style={styles.subtitle}>
          Discover your dream home nearby with DoorVue — your trusted partner in
          finding the ideal place to live!
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => router.push("/signin")}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <SignUpText />

        <GuestButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    height: "50%",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#4A90E2",
    marginBottom: 15,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  signInButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Welcome;
