import { Link } from "expo-router";
import { Text, View } from "react-native";
import CreateAuthStyles from "@/assets/Styles/auth.styles";

export default function Index() {
  const styles = CreateAuthStyles();
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <Link href="./signup">SignUp</Link>
    </View>
  );
}
