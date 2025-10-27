import { Product } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";

import { COLORS } from "../assets/styles/style";

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
            <Text style={styles.placeholderIcon}>📂 </Text>
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
          <Ionicons name="create-outline" size={30} color="#4f84f7ff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id, item.productName)}
        >
          <Ionicons name="trash-outline" size={30} color="#f66969ff" />
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
      {products.length > 0 ? (
        <View style={styles.headerBar}>
          <Text style={styles.headerText}>My Products ({products.length})</Text>
          <TouchableOpacity
            onPress={() => router.push("/addNewProduct")}
            style={{}}
          >
            <Ionicons name="add-outline" size={30} color="#4f84f7ff" />
          </TouchableOpacity>
        </View>
      ) : null}

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrapper}>
              <Ionicons name="cube-outline" size={60} color={COLORS.primary} />
            </View>

            <Text style={styles.emptyTitle}>No Products Yet</Text>
            <Text style={styles.emptySubtitle}>
              Keep track of your stock easily. Tap the button below to add your
              first product.
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/addNewProduct")}
              style={styles.addProductButton}
            >
              <Ionicons
                name="add-outline"
                size={22}
                color={COLORS.accentLight}
              />
              <Text style={styles.addProductButtonText}>Add Product</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ProductList;
