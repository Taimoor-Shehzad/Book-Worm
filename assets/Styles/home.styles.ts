import { COLORS } from "../../constants/colors";
import { StyleSheet } from "react-native";

const CreateHomeStyles = () => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.background,
      padding: 22,
      paddingVertical: 0,
      flexGrow: 1,
    },

    listContainer: {
      gap: 18,
      flexGrow: 1,
      padding: 3,
      paddingVertical: 9,
    },

    bookContainer: {
      backgroundColor: COLORS.white,
      width: "100%",
      padding: 12,
      elevation: 3,
      borderRadius: 14,
      gap: 12,
    },

    bookHeaderContainer: {
      flexDirection: "row",
      flexGrow: 1,
      gap: 8,
      alignItems: "center",
    },

    profileImage: {
      height: 28,
      width: 28,
    },

    userName: {
      color: COLORS.textPrimary,
      fontWeight: 800,
    },

    bookImageContanier: {
      width: "100%",
      height: 170,
    },

    bookImage: {
      height: "100%",
      width: "100%",
      borderRadius: 14,
    },

    bookDetails: { gap: 5 },

    bookTitle: {
      color: COLORS.textPrimary,
      fontSize: 15,
      fontWeight: "bold",
    },

    bookRating: {
      flexDirection: "row",
      gap: 2,
    },

    bookCaption: {
      color: COLORS.textPrimary,
    },

    bookDate: {
      color: COLORS.textSecondary,
      fontSize: 12,
    },

    header: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
      gap: 3,
    },

    headerTitle: {
      color: COLORS.primary,
      fontSize: 24,
      fontWeight: "bold",
    },

    headerCaption: {
      color: COLORS.placeholderText,
      fontSize: 14,
    },
  });

  return styles;
};

export default CreateHomeStyles;
