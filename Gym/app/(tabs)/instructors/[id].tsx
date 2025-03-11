import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import instructors from "../../data/instructorsData";

export default function InstructorDetail() {
  const { id } = useLocalSearchParams(); // Get ID from the URL
  const instructorId = parseInt(id as string, 10); // Ensure `id` is a number
  const instructor = instructors?.find((instr) => instr.id === instructorId);

  // Debugging: Log values
  // console.log("Instructor ID:", instructorId);
  // console.log("Instructors Data:", instructors);
  // console.log("Found Instructor:", instructor);

  if (!instructors) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5F506B" />
        <Text style={styles.errorText}>Loading instructor data...</Text>
      </View>
    );
  }

  if (!instructor) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Instructor Not Found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={instructor.image} style={styles.image} />
      <Text style={styles.name}>{instructor.name}</Text>
      <Text style={styles.specialty}>{instructor.specialty}</Text>
      <Text style={styles.bio}>{instructor.bio}</Text>

      <Text style={styles.sectionTitle}>Certifications</Text>
      {Array.isArray(instructor.classes) && instructor.classes.length > 0 ? (
        instructor.classes.map((className, index) => (
          <Text key={index} style={styles.listItem}>{className}</Text>
        ))
      ) : (
        <Text style={styles.listItem}>No certifications available</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  specialty: {
    fontSize: 18,
    color: "gray",
    marginBottom: 10,
  },
  bio: {
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  listItem: {
    fontSize: 16,
    marginVertical: 2,
  },
  errorText: {
    fontSize: 20,
    color: "red",
  },
});
