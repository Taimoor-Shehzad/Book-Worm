import { Link } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import CreateAuthStyles from "@/assets/Styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";

const signup = () => {
  const styles = CreateAuthStyles();
  const [isHidden, setIsHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [passsword, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
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
                    value={fullName}
                    onChangeText={setFullName}
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
                    value={passsword}
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
          <Pressable style={styles.submitButton}>
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
          </Pressable>
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
