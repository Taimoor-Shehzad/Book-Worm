import { COLORS } from "../../constants/colors";
import { StyleSheet } from "react-native";

const CreateHomeStyles = () => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.background,
    },
  });

  return styles;
};

export default CreateHomeStyles;
