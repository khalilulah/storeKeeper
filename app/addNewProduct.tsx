import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../assets/styles/addProductStyle";

const addNewProduct = () => {
  const [form, setForm] = useState({
    productName: "",
    quantity: "",
    price: "",
    image: "",
  });

  const db = useSQLiteContext();

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

  const handleSubmit = async () => {
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

      if (!form.price || isNaN(parseInt(form.price, 10))) {
        Alert.alert("Error", "Please enter a valid price");
        return;
      }

      await db.runAsync(
        `INSERT INTO products(productName, quantity, price, image) VALUES(?,?,?,?)`,
        [
          form.productName,
          parseInt(form.quantity),
          parseFloat(form.price),
          form.image,
        ]
      );

      Alert.alert("Success", "Product added successfully!");
      setForm({
        productName: "",
        quantity: "",
        price: "",
        image: "",
      });
      router.push("/");
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              placeholderTextColor="#999"
              value={form.productName}
              onChangeText={(text) => setForm({ ...form, productName: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Quantity"
              placeholderTextColor="#999"
              value={form.quantity}
              onChangeText={(text) => setForm({ ...form, quantity: text })}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Price (₦)"
              placeholderTextColor="#999"
              value={form.price}
              onChangeText={(text) => setForm({ ...form, price: text })}
              keyboardType="decimal-pad"
            />

            {/* Image Preview */}
            {form.image ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: form.image }}
                  style={styles.imagePreview}
                />
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
                <Text style={styles.imagePlaceholderIcon}>📷</Text>
                <Text style={styles.imagePlaceholderText}>
                  Add Product Image
                </Text>
                <Text style={styles.imagePlaceholderSubtext}>
                  Tap to take photo or choose from gallery
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Add Product</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default addNewProduct;
