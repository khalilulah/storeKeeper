import { Product } from "@/types/type";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../assets/styles/editProductStyle";

const editProduct = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const router = useRouter();
  const db = useSQLiteContext();

  const [form, setForm] = useState({
    productName: "",
    quantity: "",
    price: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load product data
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const result = await db.getFirstAsync<Product>(
        `SELECT * FROM products WHERE id = ?`,
        [productId]
      );

      if (result) {
        setForm({
          productName: result.productName,
          quantity: result.quantity.toString(),
          price: result.price.toString(),
          image: result.image || "",
        });
      } else {
        Alert.alert("Error", "Product not found");
        router.back();
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to load product");
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  // Request camera permissions
  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || mediaStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Camera and gallery permissions are required"
      );
      return false;
    }
    return true;
  };

  // Take photo with camera
  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled) {
        setForm({ ...form, image: result.assets[0].uri });
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to take photo");
    }
  };

  // Pick image from gallery
  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled) {
        setForm({ ...form, image: result.assets[0].uri });
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  // Show options for camera or gallery
  const handleImageSelection = () => {
    Alert.alert("Select Image", "Choose an option", [
      {
        text: "Take Photo",
        onPress: takePhoto,
      },
      {
        text: "Choose from Gallery",
        onPress: pickImage,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const handleUpdate = async () => {
    try {
      if (!form.productName) {
        Alert.alert("Error", "Enter a product name");
        return;
      }

      if (
        !form.quantity ||
        isNaN(parseInt(form.quantity, 10)) ||
        parseInt(form.quantity, 10) < 1
      ) {
        Alert.alert("Error", "Please enter a valid quantity");
        return;
      }

      if (!form.price || isNaN(parseFloat(form.price))) {
        Alert.alert("Error", "Please enter a valid price");
        return;
      }

      await db.runAsync(
        `UPDATE products SET productName = ?, quantity = ?, price = ?, image = ? WHERE id = ?`,
        [
          form.productName,
          parseInt(form.quantity),
          parseFloat(form.price),
          form.image,
          productId,
        ]
      );

      Alert.alert("Success", "Product updated successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={form.productName}
            onChangeText={(text) => setForm({ ...form, productName: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={form.quantity}
            onChangeText={(text) => setForm({ ...form, quantity: text })}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Price"
            value={form.price}
            onChangeText={(text) => setForm({ ...form, price: text })}
            keyboardType="decimal-pad"
          />

          {/* Image Preview */}
          {form.image ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: form.image }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={handleImageSelection}
              >
                <Text style={styles.changeImageText}>Change Image</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.imagePlaceholder}
              onPress={handleImageSelection}
            >
              <Text style={styles.imagePlaceholderText}>
                📷 Add Product Image
              </Text>
              <Text style={styles.imagePlaceholderSubtext}>
                Tap to take photo or choose from gallery
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default editProduct;
