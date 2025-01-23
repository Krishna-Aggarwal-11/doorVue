import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface House {
  id: string;
  imageUrl: string;
  description: string;
  price: string;
  address: string;
  category: string;
  location: {
    latitude: string;
    longitude: string;
  };
}

const categories = ["All", "House", "Apartment", "Villa"];

export default function TabOneScreen() {
  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      const user = await AsyncStorage.getItem("DoorVue");
      if (user) {
        const data = JSON.parse(user);
        setUsername(data.username);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    fetchHouses();
  }, []);

  useEffect(() => {
    filterHouses();
  }, [searchQuery, houses, selectedCategory]);

  const filterHouses = () => {
    let filtered = houses;

    if (searchQuery) {
      filtered = filtered.filter((house) =>
        house.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((house) =>
        house.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    setFilteredHouses(filtered);
  };

  const fetchHouses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://6790da50af8442fd73780560.mockapi.io/estate"
      );
      if (!response.ok) throw new Error("Failed to fetch houses");
      const data = await response.json();
      setHouses(data);
      setFilteredHouses(data);
    } catch (error) {
      setError("An error occurred while fetching houses");
    } finally {
      setIsLoading(false);
    }
  };

  const renderHouseItem = ({ item }: { item: House }) => (
    <View style={styles.houseCardWrapper}>
      <Pressable style={styles.houseCard} onPress={() =>router.push(`/house/${item.id}` as any)}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.houseImage}
          resizeMode="cover"
        />

        <View style={styles.houseInfo}>
          <Text style={styles.price}>Rs. {item.price}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.details}>
            <View style={styles.location}>
              <Ionicons name="location" size={12} color="#666" />
              <Text style={styles.locationText} numberOfLines={1}>
                {item.address}
              </Text>
            </View>
          </View>
          <View style={styles.details}>
            <View style={[styles.location, { marginTop: 2 }]}>
              <Ionicons name="home-sharp" size={12} color="#666" />
              <Text style={styles.locationText} numberOfLines={1}>
                {item.category}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={fetchHouses}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          style={styles.userImage}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcomeText}>Welcome To DoorVue</Text>
          <Text style={styles.userName}>{username || "Guest"}</Text>
        </View>

      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search houses by address..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="royalblue" />
        </View>
      ) : (
        <FlatList
          data={filteredHouses}
          renderItem={renderHouseItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.centerContainer}>
              <Text style={styles.emptyText}>No houses found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    marginBottom: 8,
  },
  headerTextContainer: {
    flex: 1,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: "#666",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    marginBottom: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
    paddingHorizontal: 4,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: "#007AFF",
  },
  categoryText: {
    color: "#666",
  },
  selectedCategoryText: {
    color: "white",
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  houseCardWrapper: {
    width: "48%",
    marginBottom: 16,
  },
  houseCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  houseImage: {
    width: "100%",
    height: 150,
  },
  houseInfo: {
    padding: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#ff4444",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});
