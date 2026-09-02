import { View, Text } from "react-native";
import { Pressable } from "react-native";
import { useAuthStore } from "../../../store/authStore";

const Home = () => {
  const { logout } = useAuthStore();
  return (
    <View>
      <Text>Welcome Home</Text>
      <Pressable
        onPress={() => {
          logout();
        }}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Home;
