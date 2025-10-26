import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  keyboardView: {
    flex: 1,
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    fontSize: 16,
    color: "#333",
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  changeImageButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  changeImageText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  imagePlaceholder: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
    alignItems: "center",
  },
  imagePlaceholderIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  imagePlaceholderText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
    marginBottom: 8,
  },
  imagePlaceholderSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default styles;
