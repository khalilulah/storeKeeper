import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#4f84f7ff",
  secondary: "#60A5FA",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#0e1913ef",
  subtext: "#6B7280",
  border: "#E5E7EB",
  danger: "#EF4444",
  success: "#10B981",
  icon: "#1E3A8A",
  accentLight: "#E3F2FD",
};

export const SIZES = {
  base: 8,
  radius: 12,
  padding: 16,
  fontSmall: 12,
  font: 14,
  fontMedium: 16,
  fontLarge: 20,
  fontXL: 24,
  width,
  height,
};

// Shadow Style
export const SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 3,
};

//  Shared Styles
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
  },

  // Header Bar
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SIZES.padding,
  },
  headerText: {
    fontSize: SIZES.fontLarge,
    fontWeight: "700",
    color: COLORS.text,
  },

  // Product Card
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.base * 2,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW,
  },

  imageContainer: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imagePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  placeholderIcon: {
    fontSize: SIZES.fontXL,
  },

  // Product Info
  detailsContainer: {
    flex: 1,
    marginLeft: SIZES.padding,
  },
  productName: {
    fontSize: SIZES.fontMedium,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SIZES.base / 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  infoLabel: {
    fontSize: SIZES.font,
    color: COLORS.subtext,
    marginRight: 4,
  },
  infoValue: {
    fontSize: SIZES.font,
    color: COLORS.text,
    fontWeight: "500",
  },
  priceValue: {
    fontSize: SIZES.fontMedium,
    color: COLORS.primary,
    fontWeight: "600",
  },

  // Action Buttons
  actionsContainer: {
    alignItems: "center",
    gap: 10,
  },
  editButton: {
    padding: SIZES.base,
    borderRadius: SIZES.radius / 2,
  },
  deleteButton: {
    padding: SIZES.base,
    borderRadius: SIZES.radius / 2,
  },
  deleteIcon: {
    fontSize: SIZES.fontLarge,
  },

  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },

  // FlatList
  listContent: {
    paddingBottom: SIZES.padding * 2,
  },

  // Empty List Styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.padding * 2,
    backgroundColor: COLORS.background,
  },
  emptyIconWrapper: {
    backgroundColor: COLORS.accentLight,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.subtext,
    textAlign: "center",
    paddingHorizontal: 30,
    lineHeight: 20,
    marginBottom: 20,
  },
  addProductButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: SIZES.radius * 1.2,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  addProductButtonText: {
    color: COLORS.accentLight,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
