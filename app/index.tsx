import * as ImagePicker from "expo-image-picker";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
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

      //make sure the user enters a valid quantity
      if (
        !form.quantity ||
        isNaN(parseInt(form.quantity, 10)) ||
        parseInt(form.quantity, 10) < 1
      ) {
        Alert.alert("Error", "Please enter a valid quantity");
        return;
      }

      //make sure the user enters a valid price
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
      Alert.alert("Success", "user added sucessfully!");
      setForm({
        productName: "",
        quantity: "",
        price: "",
        image: "",
      });
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occured");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <TextInput
            placeholder="Product Name"
            value={form.productName}
            onChangeText={(text) => setForm({ ...form, productName: text })}
          />
          <TextInput
            placeholder="Quantity"
            value={form.quantity}
            onChangeText={(text) => setForm({ ...form, quantity: text })}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Price"
            value={form.price}
            onChangeText={(text) => setForm({ ...form, price: text })}
            keyboardType="decimal-pad"
          />
          {/* Image Preview */}
          {form.image ? (
            <View>
              <Image source={{ uri: form.image }} />
              <TouchableOpacity onPress={handleImageSelection}>
                <Text>Change Image</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={handleImageSelection}>
              <Text>📷 Add Product Image</Text>
              <Text>Tap to take photo or choose from gallery</Text>
            </TouchableOpacity>
          )}

          <Button title="Add Product" onPress={handleSubmit} />
        </View>
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
