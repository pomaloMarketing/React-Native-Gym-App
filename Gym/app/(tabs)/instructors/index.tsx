import { View, Text, FlatList, Image, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
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
    <View style={styles.container}>
      <Text style={styles.title}>Meet Our Instructors</Text>
      <FlatList
        data={instructors}
        keyExtractor={(item) => item?.id?.toString() ?? Math.random().toString()} // Safe extraction
        renderItem={({ item }) => (
          <Link href={`/instructors/${item.id}`} asChild>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
