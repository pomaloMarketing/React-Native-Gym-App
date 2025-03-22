import { View, Text, FlatList, Image, Pressable, StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import { Link } from "expo-router";
import classes from "../../data/classData";

export default function ClassesPage() {
  if (!classes) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5F506B" />
        <Text style={styles.errorText}>Loading classes...</Text>
      </View>
    );
  }

  if (classes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No classes available.</Text>
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
      <Text style={styles.title}>Our Classes</Text>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <Link style={styles.linkTitle} href={`/classesList/${item.id}`} asChild>
            <Pressable style={styles.card}>
              {item.img ? (
                <Image source={item.img} style={styles.image} />
              ) : (
                <View style={styles.placeholderImage} />
              )}
              <Text style={styles.name}>{item.title || "Unknown Class"}</Text>
              {/* <Text style={styles.description}>{item.description}</Text> */}
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
  linkTitle: {
    color: "#fff",
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
    color: "white",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    color: "white",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginRight: 10,
    objectFit: "contain",
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
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 20,
    color: "red",
  },
});
