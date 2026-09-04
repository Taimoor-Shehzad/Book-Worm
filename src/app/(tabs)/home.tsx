import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Image } from "expo-image";
import { useAuthStore } from "../../../store/authStore";
import CreateHomeStyles from "@/assets/Styles/home.styles";
import { Activity, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/colors";
import { API_URL } from "../../../constants/api";
import { formatPublishDate } from "../../../lib/utils";
import Loader from "../../../components/Loader";

const Home = () => {
  const { logout, token } = useAuthStore();
  const [books, setBooks] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasmore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const styles = CreateHomeStyles();

  const fetchBooks = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch books");
      }

      setBooks((prevBooks) => {
        // 1. Reset on initial load or pull-to-refresh
        if (refresh || pageNum === 1) {
          return data.books;
        }

        // 2. Extract existing IDs for fast lookup
        const existingIds = new Set(prevBooks.map((book) => book._id));

        // 3. Keep only new books that aren't already in state
        const newBooks = data.books.filter(
          (book: any) => !existingIds.has(book._id),
        );

        // 4. Append filtered books to state
        return [...prevBooks, ...newBooks];
      });

      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.log("Error fetching books", error);
    } finally {
      if (refresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (hasmore && !loading && !refreshing) {
      await fetchBooks(page + 1);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderBook = ({ item }: { item: any }) => (
    //PH DATA
    <View style={styles.bookContainer}>
      <View style={styles.bookHeaderContainer}>
        <Image
          source={item.user.profileImage}
          style={styles.profileImage}
          contentFit="cover"
        />
        <Text style={styles.userName}>{item.user.username}</Text>
      </View>
      <View style={styles.bookImageContanier}>
        <Image
          style={styles.bookImage}
          contentFit="cover"
          source={item.image}
        />
      </View>
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.bookRating}>{renderRating(item.rating)}</View>
        <Text style={styles.bookCaption}>{item.caption}</Text>
        <Text style={styles.bookDate}>
          Shared on {formatPublishDate(item.createdAt)}
        </Text>
      </View>
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

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchBooks(1, true)}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>BookWorm 🐌</Text>
            <Text style={styles.headerCaption}>
              Discover great books from the community 👇
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="book-outline"
              size={60}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <Text style={styles.emptySubtext}>
              Be the first to share a book!
            </Text>
          </View>
        }
        ListFooterComponent={
          hasmore && books.length > 0 ? (
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          ) : null
        }
      />
    </View>
  );
};

export default Home;
