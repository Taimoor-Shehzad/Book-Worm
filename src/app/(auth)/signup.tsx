import { View, Text } from "react-native";
import { Link } from "expo-router";
import CreateAuthStyles from "@/assets/Styles/auth.styles";

const signup = () => {
  const styles = CreateAuthStyles();
  return (
    <View style={styles.container}>
      <Text>signup</Text>
      <Link href="/">Login</Link>
    </View>
  );
};

export default signup;
