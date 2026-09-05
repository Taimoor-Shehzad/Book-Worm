import {
  View,
  Text,
  Pressable,
  Alert,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import CreateProfileStyles from "@/assets/Styles/profile.styles";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/colors";
import { API_URL } from "../../../constants/api";
import { useAuthStore } from "../../../store/authStore";
import { formatMemberSince, formatPublishDate } from "../../../lib/utils";
import Loader from "../../../components/Loader";
import { router } from "expo-router";

const Profile = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteBookId, setDeleteBookid] = useState<null | string>("");
  const [refreshing, setRefreshing] = useState(false);

  const { token, logout, user } = useAuthStore();
  const styles = CreateProfileStyles();

  const fetchData = async () => {
    try {
      if (refreshing) {
        setLoading(false);
      } else setLoading(true);
      const response = await fetch(`${API_URL}/books/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching user books");
      }

      setBooks(data);
    } catch (error) {
      console.log("Error fetching books", error);
      Alert.alert(
        "Error",
        "Failed to load profile data, please refresh the page",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItemm = ({ item }: { item: any }) => (
    <View style={styles.bookContainer}>
      <View style={styles.bookContainerLeft}>
        <View style={styles.center}>
          <Image
            style={styles.bookImage}
            source={item.image}
            contentFit="cover"
          />
        </View>
        <View style={styles.bookDetailsContainer}>
          <Text style={styles.bookName}>{item.title}</Text>
          <View style={styles.bookRating}>{renderRating(item.rating)}</View>
          <Text style={styles.bookCaption} numberOfLines={2}>
            {item.caption}
          </Text>
          <Text style={styles.bookDate}>
            {formatPublishDate(item.createdAt)}
          </Text>
        </View>
      </View>
      <Pressable
        style={styles.trashIcon}
        onPress={() => confirmDeleteBook(item._id)}
      >
        {deleteBookId === item._id ? (
          <ActivityIndicator size={"small"} color={COLORS.primary} />
        ) : (
          <Ionicons name="trash-outline" size={20} color={"#000"} />
        )}
      </Pressable>
    </View>
  );

  const renderRating = (rating: any) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          size={14}
          name={i <= rating ? "star" : "star-outline"}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
        />,
      );
    }
    return stars;
  };

  const confirmLogout = () => {
    Alert.alert("Logout", "Are your sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => logout() },
    ]);
  };

  const deleteBook = async (bookid: any) => {
    try {
      setDeleteBookid(bookid);
      const response = await fetch(`${API_URL}/books/${bookid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error deleting book");
      }

      setBooks(books.filter((book) => bookid !== book._id));

      Alert.alert("Success", "Book deleted succesfully");
    } catch (error: any) {
      console.log("Error deleting book", error);
      Alert.alert("Error", error.message || "Error deleting book");
    } finally {
      setDeleteBookid(null);
    }
  };

  const confirmDeleteBook = (bookid: any) => {
    Alert.alert("Delete Book", "Are your sure you want to delete this book?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteBook(bookid),
      },
    ]);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setLoading(false);
    await fetchData();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={user.profileImage}
          style={styles.avatar}
          contentFit="contain"
        />
        <View style={styles.personalDetails}>
          <Text style={styles.name}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.joinedDate}>
            Member since {formatMemberSince(user.createdAt)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          confirmLogout();
        }}
      >
        <View style={styles.center}>
          <Ionicons size={18} color={COLORS.white} name="exit-outline" />
        </View>
        <View style={styles.center}>
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Your Recommendation</Text>
        <Text style={styles.noOfBooks}>{books.length} books</Text>
      </View>
      <FlatList
        data={books}
        renderItem={renderItemm}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 4,
          paddingVertical: 8,
        }}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="book-outline"
              size={50}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Text style={styles.addButtonText}>Add Your First Book</Text>
            </TouchableOpacity>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleRefresh()}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
};

export default Profile;
