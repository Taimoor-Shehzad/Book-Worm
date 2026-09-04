import { View, Text, FlatList, Image } from "react-native";
// import { Image } from "expo-image";
import { useAuthStore } from "../../../store/authStore";
import CreateHomeStyles from "@/assets/Styles/home.styles";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/colors";

const Home = () => {
  const { logout } = useAuthStore();
  const [books, setBooks] = useState([
    {
      _id: "12313",
      work: "hhh",
      num: 7377,
    },
    {
      _id: "342424",
      work: "hhh",
      num: 7787,
    },
    {
      _id: "90898",
      work: "hhh",
      num: 77,
    },
  ]); //PH

  const styles = CreateHomeStyles();
  const fetchBooks = async () => {};

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderBook = ({ item }: { item: any }) => (
    //PH DATA
    <View style={styles.bookContainer}>
      <View style={styles.bookHeaderContainer}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2yGDr34mjFWlbLRGMxLIhAoPCC5vmMvDEbVm6cSZLeNw-n0eWNj-2wls&s",
          }}
          style={styles.profileImage}
          resizeMode="contain"
        />
        <Text style={styles.userName}>John Doe</Text>
      </View>
      <View style={styles.bookImageContanier}>
        <Image
          style={styles.bookImage}
          resizeMode="cover"
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr88sLqEZYYxTyexHT4zhukQ28FXmsQio4MJy0-tLOrA&s=10",
          }}
        />
      </View>
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>The Hunger Games</Text>
        <View style={styles.bookRating}>{renderRating(3)}</View>
        <Text style={styles.bookCaption}>
          A tale of survival rebellion and sacrifice for family.
        </Text>
        <Text style={styles.bookDate}>3/9/2025</Text>
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

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>BookWorm 🐌</Text>
            <Text style={styles.headerCaption}>
              Discover great books from the community 👇
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Home;
