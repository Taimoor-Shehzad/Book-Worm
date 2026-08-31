import { COLORS } from "../../constants/colors";
import { StyleSheet } from "react-native";

const CreateAuthStyles = () => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.background,
      flex: 1,
    },
  });

  return styles;
};

export default CreateAuthStyles;
