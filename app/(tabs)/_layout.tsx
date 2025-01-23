import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
        }}
      >
        <StatusBar style="dark" backgroundColor="white" />

        <Tabs
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <Ionicons name="home-outline" color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color }) => (
                <Ionicons name="search-outline" color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerShown: true,

              tabBarIcon: ({ color }) => (
                <Ionicons name="person-outline" color={color} size={24} />
              ),
            }}
          />
        </Tabs>
      </View>
    </SafeAreaProvider>
  );
}
