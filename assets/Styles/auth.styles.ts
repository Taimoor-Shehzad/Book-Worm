import { COLORS } from "../../constants/colors";
import { StyleSheet } from "react-native";

const CreateAuthStyles = () => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.background,
    },
  });

  return styles;
};

export default CreateAuthStyles;
