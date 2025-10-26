import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  cancelButton: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  formContainer: {
    padding: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  imageContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  changeImageButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  changeImageText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  imagePlaceholder: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  imagePlaceholderSubtext: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  updateButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
