import { COLORS } from "../../constants/colors";
import { StyleSheet } from "react-native";

const CreateAuthStyles = () => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.background,
      flex: 1,
      padding: 28,
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
    },
    image: {
      resizeMode: "contain",
      height: 280,
    },
    mainContainer: {
      backgroundColor: COLORS.white,
      elevation: 4,
      width: "100%",
      padding: 18,
      paddingVertical: 28,
      borderRadius: 16,
    },

    mainInputContainer: {
      marginBottom: 10,
      gap: 9,
    },

    inputTitle: {
      color: COLORS.textPrimary,
      fontWeight: "bold",
    },

    inputContainer: {
      flexDirection: "row",
      borderWidth: 1,
      borderColor: COLORS.border,
      paddingHorizontal: 10,
      paddingRight: 14,
      borderRadius: 10,
      gap: 9,
      overflow: "hidden",
    },

    inputBox: {
      width: "100%",
    },

    input: {
      width: "100%",
      color: COLORS.textPrimary,
      fontWeight: "bold",
    },

    center: {
      justifyContent: "center",
      alignItems: "center",
    },

    eyeIcon: {
      marginLeft: "auto",
    },

    submitButton: {
      width: "100%",
      backgroundColor: COLORS.primary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 11,
      padding: 13,
      marginTop: 13,
    },

    linkTextContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 13,
      gap: 8,
    },

    linkText: {
      color: COLORS.primary,
      fontWeight: "bold",
    },

    signupHeader: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginBottom: 26,
    },

    mainTitle: {
      color: COLORS.primary,
      fontFamily: "JetBrainsMono-Medium",
      fontSize: 25,
    },
    titleCaption: {
      color: COLORS.textSecondary,
      fontSize: 15,
    },
  });

  return styles;
};

export default CreateAuthStyles;
