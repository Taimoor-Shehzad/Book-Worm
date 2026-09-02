import { Link } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CreateAuthStyles from "@/assets/Styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";

export default function Index() {
  const styles = CreateAuthStyles();
  const [isHidden, setIsHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  const { login, isLoading, token, user, checkAuth } = useAuthStore();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (!result.success) {
      Alert.alert("Error", result.error);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={require("@/assets/images/i.png")} />
        <View style={styles.mainContainer}>
          <View>
            <View style={styles.mainInputContainer}>
              <Text style={styles.inputTitle}>Email</Text>
              <View style={styles.inputContainer}>
                <View style={styles.center}>
                  <Ionicons
                    name="mail-outline"
                    size={19}
                    color={COLORS.primary}
                  />
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={COLORS.textSecondary}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
            </View>
            <View style={styles.mainInputContainer}>
              <Text style={styles.inputTitle}>Password</Text>
              <View style={styles.inputContainer}>
                <View style={styles.center}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={19}
                    color={COLORS.primary}
                  />
                </View>
                <View style={[styles.center]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor={COLORS.textSecondary}
                    secureTextEntry={isHidden ? true : false}
                    value={password}
                    onChangeText={setPasword}
                  />
                </View>
                <Pressable
                  style={[styles.center, styles.eyeIcon]}
                  onPress={() => {
                    setIsHidden(!isHidden);
                  }}
                >
                  <Ionicons
                    name={isHidden ? "eye-off-outline" : "eye-outline"}
                    size={19}
                    color={COLORS.primary}
                  />
                </Pressable>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              handleLogin();
            }}
          >
            {isLoading ? (
              <ActivityIndicator color={"#fff"} />
            ) : (
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            )}
          </TouchableOpacity>
          <View style={styles.linkTextContainer}>
            <Text>Don't have an account?</Text>
            <Link style={styles.linkText} href="./signup">
              Sign Up
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
