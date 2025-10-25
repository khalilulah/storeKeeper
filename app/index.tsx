import { Product } from "@/types/type";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../assets/styles/style";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const db = useSQLiteContext();

  const loadProducts = async () => {
    try {
      const results = await db.getAllAsync<Product>(`SELECT * FROM products`);
      setProducts(results);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Database Error");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const handleDelete = async (id: number, productName: string) => {
    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete "${productName}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await db.runAsync(`DELETE FROM products WHERE id = ?`, [id]);
              Alert.alert("Success", "Product deleted successfully");
              loadProducts(); // Reload the list
            } catch (error: any) {
              Alert.alert("Error", error.message || "Failed to delete product");
            }
          },
        },
      ]
    );
  };

  const handleEdit = (item: Product) => {
    router.push({
      pathname: "/editProduct",
      params: { productId: item.id },
    });
  };

  const renderItem = ({ item }: { item: Product }) => (
    <SafeAreaView style={styles.card}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.productImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderIcon}>📦</Text>
          </View>
        )}
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.productName}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Qty:</Text>
          <Text style={styles.infoValue}>{item.quantity}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Price:</Text>
          <Text style={styles.priceValue}>₦{item.price.toLocaleString()}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id, item.productName)}
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyText}>No products yet</Text>
            <TouchableOpacity
              onPress={() => router.push("/addNewProduct")}
              style={{
                backgroundColor: "#007AFF",
                paddingHorizontal: 24,

                paddingVertical: 12,
                borderRadius: 8,
                marginTop: 16,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Add your first product to get started
              </Text>
            </TouchableOpacity>
          </View>
        }
        ListHeaderComponent={
          <TouchableOpacity
            style={{
              backgroundColor: "#007AFF",
              paddingHorizontal: 8,
              paddingVertical: 6,
              width: 130,
              borderRadius: 8,
              marginBottom: 10,
            }}
            onPress={() => router.push("/addNewProduct")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Add product
            </Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};

export default ProductList;
