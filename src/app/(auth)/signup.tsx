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

const signup = () => {
  const styles = CreateAuthStyles();
  const [isHidden, setIsHidden] = useState(true);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { register, isLoading } = useAuthStore();
  const handleSignup = async () => {
    const result = await register(username, email, password);
    if (!result.success) {
      Alert.alert("Error", `${result.error}`);
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
        <View style={styles.mainContainer}>
          <View>
            <View style={styles.signupHeader}>
              <Text style={styles.mainTitle}>BookWorm🐌</Text>
              <Text style={styles.titleCaption}>
                Share your favourite books
              </Text>
            </View>
            <View style={styles.mainInputContainer}>
              <Text style={styles.inputTitle}>Full Name</Text>
              <View style={styles.inputContainer}>
                <View style={styles.center}>
                  <Ionicons
                    name="person-outline"
                    size={19}
                    color={COLORS.primary}
                  />
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your Full Name"
                    placeholderTextColor={COLORS.textSecondary}
                    autoCapitalize="none"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
              </View>
            </View>
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
                    onChangeText={setPassword}
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
              handleSignup();
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
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
          <View style={styles.linkTextContainer}>
            <Text>Already have an account?</Text>
            <Link style={styles.linkText} href="/">
              Login
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default signup;
