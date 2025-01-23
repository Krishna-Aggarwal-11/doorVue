import { useEffect, useState } from "react";
import {
  StyleSheet,
  Pressable,
  Image,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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

const categoryIcons: { [key: string]: string } = {
  house: "home",
  apartment: "business",
  villa: "sunny",
  condo: "key",
  default: "grid",
};

export default function ExploreScreen() {
  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [exploreCategories, setExploreCategories] = useState<
    { category: string; count: number; icon: string }[]
  >([]);

  useEffect(() => {
    fetchHouses();
  }, []);

  // for filtering
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
    try {
      const response = await fetch(
        "https://6790da50af8442fd73780560.mockapi.io/estate"
      );
      if (!response.ok) throw new Error("Failed to fetch houses");
      const data = await response.json();
      setHouses(data);
      setFilteredHouses(data);
    } catch (error) {
      Alert.alert("An error occurred while fetching houses");
    } finally {
      setIsLoading(false);
    }
  };

  // for category counts
  useEffect(() => {
    if (houses.length > 0) {
      const categoryCounts = houses.reduce(
        (
          acc: Array<{ category: string; count: number; icon: string }>,
          item
        ) => {
          const existingCategory = acc.find(
            (c) => c.category.toLowerCase() === item.category.toLowerCase()
          );
          if (existingCategory) {
            existingCategory.count++;
          } else {
            acc.push({
              category: item.category,
              count: 1,
              icon:
                categoryIcons[item.category.toLowerCase()] ||
                categoryIcons.default,
            });
          }
          return acc;
        },
        []
      );

      setExploreCategories([
        { category: "All", count: houses.length, icon: "grid" },
        ...categoryCounts,
      ]);
    }
  }, [houses]);

  const renderHouseItem = ({ item }: { item: House }) => (
    <Pressable style={styles.houseCard} onPress={() =>router.push(`/house/${item.id}` as any)}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.houseImage}
       resizeMode="cover"
      />
      <View style={styles.houseInfo}>
        <Text style={styles.housePrice}>Rs. {item.price}</Text>
        <Text style={styles.houseDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.houseLocation}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={styles.locationText}>{item.address}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by location"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoriesGrid}>
        {exploreCategories.map((category) => (
          <Pressable
            key={category.category}
            style={[
              styles.categoryCard,
              selectedCategory === category.category &&
                styles.selectedCategoryCard,
            ]}
            onPress={() => setSelectedCategory(category.category)}
          >
            <View style={styles.categoryIcon}>
              <Ionicons
                name={category.icon as any}
                size={24}
                color={
                   "#007AFF"
                }
              />
            </View>
            <Text style={[styles.categoryName , selectedCategory === category.category && { color: "white" }]}>{category.category}</Text>
            <Text style={[styles.categoryCount, selectedCategory === category.category && { color: "white" }]}>{category.count} listings</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          {selectedCategory !== "All"
            ? `${selectedCategory} Properties`
            : "All Properties"}
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="royalblue" />
        ) : (
          <FlatList
            data={filteredHouses}
            renderItem={renderHouseItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.houseListColumnWrapper}
            ListEmptyComponent={
              <Text style={styles.emptyListText}>No properties found</Text>
            }
            scrollEnabled={false}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  searchText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 16,
  },
  sectionContainer: {
    padding: 16,
  },
  selectedCategoryCard: {
    backgroundColor: "#007AFF",
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  categoryCard: {
    width: "48%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    color: "#666",
  },

  locationText: {
    marginLeft: 4,
    color: "#666",
  },
  houseListColumnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  houseCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
  },
  houseImage: {
    width: "100%",
    height: 150,
  },
  houseInfo: {
    padding: 12,
  },
  housePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  houseDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  houseLocation: {
    flexDirection: "row",
    alignItems: "center",
  },

  emptyListText: {
    textAlign: "center",
    color: "#666",
    marginTop: 16,
  },
});
