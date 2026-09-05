import { COLORS } from "../../constants/colors";
import { StyleSheet } from "react-native";

const CreateProfileStyles = () => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.background,
      flexGrow: 1,
      padding: 22,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    header: {
      backgroundColor: COLORS.white,
      elevation: 3,
      padding: 16,
      flexDirection: "row",
      gap: 14,
      borderRadius: 14,
      width: "100%",
      alignItems: "center",
      marginTop: 45,
    },

    avatar: {
      height: 52,
      width: 52,
    },

    personalDetails: {
      justifyContent: "center",
    },

    name: {
      color: COLORS.textPrimary,
      fontWeight: 900,
      fontSize: 18,
    },

    email: {
      color: COLORS.textSecondary,
      fontSize: 12,
    },

    joinedDate: {
      color: COLORS.textSecondary,
      fontSize: 12,
    },

    logoutButton: {
      width: "100%",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.primary,
      flexDirection: "row",
      padding: 10,
      gap: 8,
      marginTop: 15,
    },

    center: {
      justifyContent: "center",
      alignItems: "center",
    },

    logoutText: {
      color: COLORS.white,
      fontWeight: "bold",
    },

    sectionTitleContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      marginTop: 18,
    },

    sectionTitle: {
      color: COLORS.textPrimary,
      fontWeight: "bold",
      fontSize: 18,
    },

    noOfBooks: {
      color: COLORS.textSecondary,
      fontSize: 14,
    },

    bookContainer: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: COLORS.white,
      borderRadius: 8,
      elevation: 3,
      padding: 10,
      marginTop: 10,
      gap: 10,
    },

    bookContainerLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },

    bookImage: {
      height: 90,
      width: 65,
      borderRadius: 7,
    },

    bookDetailsContainer: {
      flex: 1,
      marginLeft: 10,
    },

    bookName: {
      color: COLORS.textPrimary,
      fontSize: 16,
      fontWeight: "bold",
    },

    bookRating: {
      flexDirection: "row",
      gap: 2,
    },

    bookCaption: {
      color: COLORS.textDark,
      fontSize: 12,
    },

    bookDate: {
      color: COLORS.textSecondary,
      marginTop: 5,
      fontSize: 12,
    },

    trashIcon: {
      marginRight: 6,
    },

    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
      marginTop: 20,
    },
    emptyText: {
      fontSize: 16,
      fontWeight: "600",
      color: COLORS.textPrimary,
      marginTop: 16,
      marginBottom: 20,
      textAlign: "center",
    },
    addButton: {
      backgroundColor: COLORS.primary,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 20,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    addButtonText: {
      color: COLORS.white,
      fontWeight: "600",
      fontSize: 14,
    },
  });

  return styles;
};

export default CreateProfileStyles;
