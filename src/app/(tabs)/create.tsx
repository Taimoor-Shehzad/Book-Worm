import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CreateCreateStyles from "@/assets/Styles/create.styles";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { File } from "expo-file-system";
import { API_URL } from "../../../constants/api";
import { useAuthStore } from "../../../store/authStore";
import { router } from "expo-router";

const Create = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const styles = CreateCreateStyles();
  const { token, logout } = useAuthStore();

  const renderRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          />
        </TouchableOpacity>,
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
          Alert.alert("Permisson Denied", "Cant access media in your phone");
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64);
        } else {
          const file = new File(result.assets[0].uri);
          const base64 = await file.base64();
          setImageBase64(base64);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "There was a problem selecting your image");
    }
  };

  const handleSubmit = async () => {
    if (!title || !caption || !rating || !imageBase64) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (!token) {
      Alert.alert("Session expired", "Please log in again before posting.");
      return;
    }

    try {
      setLoading(true);

      const uriParts = image?.split(".");
      const fileType = uriParts?.[uriParts.length - 1];
      const imageType = fileType
        ? `image/${fileType.toLowerCase()}`
        : "image/jpeg";

      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(),
          image: imageDataUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          await logout();
          throw new Error("Your session has expired. Please log in again.");
        }
        throw new Error(
          data.message || `Post creation failed (${response.status})`,
        );
      }

      Alert.alert("Success", "Your book recommendation has been posted");
      setTitle("");
      setCaption("");
      setRating(3);
      setImage(null);
      setImageBase64(null);
      router.navigate("/(tabs)/home");
    } catch (error: any) {
      console.log("Error creating post", error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Add Book Recomendation</Text>
              <Text style={styles.headerCaption}>
                Share your favourites books with others
              </Text>
            </View>
            <View style={styles.allInputs}>
              <View style={styles.inputBox}>
                <Text style={styles.inputTitle}>Book Title</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.center}>
                    <Ionicons
                      name="book-outline"
                      size={17}
                      color={COLORS.primary}
                    />
                  </View>
                  <View style={styles.inputHolder}>
                    <TextInput
                      style={styles.input}
                      value={title}
                      placeholder="Enter book title"
                      placeholderTextColor={COLORS.placeholderText}
                      onChangeText={setTitle}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputTitle}>Your Rating</Text>
                {renderRating()}
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputTitle}>Book Image</Text>
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={() => {
                    pickImage();
                  }}
                >
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <View>
                      <View style={styles.center}>
                        <Ionicons
                          name="image-outline"
                          size={40}
                          color={COLORS.textPrimary}
                        />
                      </View>
                      <Text style={{ color: COLORS.textSecondary }}>
                        Tap to select image
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputTitle}>Caption</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inputHolder}>
                    <TextInput
                      style={styles.captionInput}
                      value={caption}
                      placeholder="Enter your reviews or thoughts about this book..."
                      placeholderTextColor={COLORS.placeholderText}
                      onChangeText={setCaption}
                      textAlignVertical="top"
                      multiline
                    />
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Share</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default Create;
