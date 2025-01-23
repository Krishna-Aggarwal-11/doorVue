import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const HouseDetails = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [unlock, setUnLock] = useState(false);
  const [distance, setDistance] = useState(0);

  const {
    data: house,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["house", id],
    queryFn: async () => {
      const response = await fetch(
        `https://6790da50af8442fd73780560.mockapi.io/estate/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchDistance = async () => {
    if (house) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is required to unlock the house."
        );
      }
      const location = await Location.getCurrentPositionAsync({});
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        house.latitude,
        house.longitude
      );
      setDistance(parseFloat(distance.toFixed(2)));
      if (distance <= 0.3) {
        setUnLock(true);
      }
    }
  };

  useEffect(() => {
    fetchDistance();
  }, [house]);

  const unlocking = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `https://6790da50af8442fd73780560.mockapi.io/estate/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },

    onSuccess: () => {
      Alert.alert("Success", "House unlocked");
    },
    onError: () => {
      Alert.alert("Error", "Unlock failed");
    },
  });

  const handleUnlock = () => {
    unlocking.mutate();
  };
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading house details</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: house.imageUrl }} style={styles.image} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.addressText}>{house.address}</Text>
          <Text style={styles.descriptionText}>{house.description}</Text>

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceText}>Rs. {house.price}</Text>
              <Text style={styles.categoryText}>{house.category}</Text>
            </View>
            <View style={styles.unlockButton}>
              <Text style={styles.unlockButtonText}>
                Distance: {distance} Km
              </Text>
            </View>
          </View>

          <View style={styles.facilitiesContainer}>
            <Text style={styles.facilitiesTitle}>Facilities</Text>
            <View style={styles.facilityItem}>
              <Ionicons name="bed" size={20} color="gray" />
              <Text style={styles.facilityText}>Rooms: 2</Text>
            </View>
            <View style={styles.facilityItem}>
              <Ionicons name="man" size={20} color="gray" />
              <Text style={styles.facilityText}>Bed Count: 2</Text>
            </View>
            <View style={styles.facilityItem}>
              <Ionicons name="water" size={20} color="gray" />
              <Text style={styles.facilityText}>Bathroom Count: 2</Text>
            </View>
            <View style={styles.facilityItem}>
              <Ionicons name="resize" size={20} color="gray" />
              <Text style={styles.facilityText}>Area: 1000 sqft</Text>
            </View>
            <View style={styles.facilityItem}>
              <Ionicons name="car" size={20} color="gray" />
              <Text style={styles.facilityText}>Garage Count: 1</Text>
            </View>
            <View style={styles.facilityItem}>
              <Ionicons name="umbrella" size={20} color="gray" />
              <Text style={styles.facilityText}>Security: 24/7</Text>
            </View>
          </View>

          {unlock ? (
            <Pressable style={styles.unlockButton} onPress={handleUnlock}>
              <Text style={styles.unlockButtonText}>Unlock House</Text>
            </Pressable>
          ) : (
            <View style={styles.unlockContainer}>
              <Text style={styles.unlockText}>
                You are too far from the selected house.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: -31,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  imageContainer: {
    position: "relative",
    marginTop: 0,
  },
  image: {
    width: "100%",
    height: 256,
    resizeMode: "cover",
    marginTop: 0,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 8,
    borderRadius: 999,
  },
  detailsContainer: {
    padding: 16,
  },
  addressText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionText: {
    color: "#666",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "600",
    color: "blue",
  },
  categoryText: {
    color: "#666",
  },
  unlockButton: {
    backgroundColor: "royalblue",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  unlockButtonText: {
    color: "white",
    fontWeight: "600",
  },
  facilitiesContainer: {
    backgroundColor: "whitesmoke",
    padding: 16,
    borderRadius: 8,
  },
  facilitiesTitle: {
    fontSize: 18,
    textDecorationLine: "underline",
    fontWeight: "bold",
    marginBottom: 16,
  },
  facilityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  facilityText: {
    color: "#666",
  },
  unlockContainer: {
    marginTop: 16,
    backgroundColor: "#FEF3C7",
    padding: 16,
    borderRadius: 8,
  },
  unlockText: {
    color: "#92400E",
    textAlign: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
});

export default HouseDetails;
