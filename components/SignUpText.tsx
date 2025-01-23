import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

const SignUpText = () => {
  return (
    <View style={styles.signupContainer}>
      <Text style={styles.signupText}>Don't have an account? </Text>
      <Link href="/signup" asChild>
        <Pressable>
          <Text style={styles.signupLink}>Sign Up</Text>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  signupContainer: {
    flexDirection: "row",
    marginTop: 10,
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

export default SignUpText;
