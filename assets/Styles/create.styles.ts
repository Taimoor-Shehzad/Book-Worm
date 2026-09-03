import { COLORS } from "../../constants/colors";
import { StyleSheet } from "react-native";

const CreateCreateStyles = () => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.background,
      padding: 22,
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
    },

    card: {
      backgroundColor: COLORS.white,
      padding: 20,
      borderRadius: 14,
      elevation: 4,
      flexGrow: 1,
      width: "100%",
    },

    header: {
      justifyContent: "center",
      alignItems: "center",
    },

    headerTitle: {
      color: COLORS.textPrimary,
      fontWeight: 900,
      fontSize: 24,
    },

    headerCaption: {
      color: COLORS.textSecondary,
      fontSize: 12,
    },

    allInputs: {
      marginTop: 20,
      gap: 20,
    },

    inputBox: {
      gap: 7,
    },

    inputTitle: {
      color: COLORS.textPrimary,
      fontSize: 15,
      fontWeight: "bold",
    },

    inputContainer: {
      flexDirection: "row",
      paddingHorizontal: 11,
      gap: 5,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 10,
    },

    center: {
      justifyContent: "center",
      alignItems: "center",
    },

    inputHolder: {
      width: "100%",
    },

    input: {
      color: COLORS.textPrimary,
      fontWeight: "bold",
    },

    ratingContainer: {
      flexDirection: "row",
      padding: 11,
      paddingHorizontal: 19,
      gap: 5,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 10,
      justifyContent: "space-between",
      alignItems: "center",
    },

    imageContainer: {
      gap: 5,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      height: 200,
    },

    captionInput: {
      color: COLORS.textPrimary,
      fontWeight: "bold",
      height: 100,
    },

    button: {
      backgroundColor: COLORS.primary,
      borderRadius: 12,
      height: 50,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 16,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },

    buttonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: "600",
    },

    buttonIcon: {
      marginRight: 8,
    },
  });

  return styles;
};

export default CreateCreateStyles;
