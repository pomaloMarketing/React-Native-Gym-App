import { View, Text, FlatList, Image, Pressable, StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import { Link } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import instructors from "../../data/instructorsData";

export default function InstructorsPage() {
  if (!instructors) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5F506B" />
        <Text style={styles.errorText}>Loading instructors...</Text>
      </View>
    );
  }

  if (instructors.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No instructors available.</Text>
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('../../../assets/images/background.webp')} 
      style={styles.container}
      imageStyle={styles.backgroundImage} 
    >
      <View>
        <Image source={require('../../../assets/images/logo.png')} style={styles.headerLogo} />
    </View>
      <Text style={styles.title}>Meet Our Instructors</Text>
      <FlatList
        data={instructors}
        keyExtractor={(item) => item?.id?.toString() ?? Math.random().toString()} 
        renderItem={({ item }) => (
          <Link href={`/Instructors/${item.id}`} asChild>
            <Pressable style={styles.card}>
              {item.image ? (
                <Image source={item.image} style={styles.image} />
              ) : (
                <View style={styles.placeholderImage} />
              )}
              <Text style={styles.name}>{item.name || "Unknown Instructor"}</Text>
            </Pressable>
          </Link>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerLogo: {
    marginTop: 50,
  },
  backgroundImage: {
    resizeMode: 'cover', 
    justifyContent: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 50,
    textAlign: "center",
    color: 'white', 
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 18,
    color: 'white', 
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
