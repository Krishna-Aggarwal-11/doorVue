import {
  View,
  Text,
  Alert,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import GuestButton from "@/components/GuestButton";

const signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const jsonData = await AsyncStorage.getItem("DoorVue");
    const user = jsonData ? JSON.parse(jsonData) : null;

    if (email === "test@example.com" && password === "password") {
      await AsyncStorage.setItem(
        "DoorVue",
        JSON.stringify({ email, password, username: "John Doe" })
      );
      router.replace("/(tabs)");
    } else if (user && user.email === email && user.password === password) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("Error", "Invalid credentials");
    }
    console.log("Sign In Pressed", { email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Link href="/signup" asChild>
          <Pressable>
            <Text style={styles.signupLink}>Sign Up</Text>
          </Pressable>
        </Link>
      </View>

      <GuestButton/>
    </View>
  );
};

export default signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#666",
  },
  signupLink: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "bold",
  },
});
