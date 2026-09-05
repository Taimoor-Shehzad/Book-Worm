import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../../store/authStore";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segment = useSegments();
  const { checkAuth, user, token } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  const [fontsLoaded, error] = useFonts({
    "JetBrainsMono-Medium": require("@/assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const isAuthScreen = segment[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !isAuthScreen) {
      router.navigate("/(auth)");
    } else if (isSignedIn && isAuthScreen) {
      router.navigate("/(tabs)/home");
    }
  }, [user, token, segment]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
