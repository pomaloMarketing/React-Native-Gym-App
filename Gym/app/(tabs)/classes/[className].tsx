import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, Button } from "react-native";
import { useRouter } from "expo-router";  // This is for programmatic navigation

const ClassSignUp = () => {
  const router = useRouter();  // Get the router
  const { query } = router;  // Destructure query from router

  // Check if query and className are available before using them
  const className = query?.className;

  const classDetails = {
    "spinning-indoor-cycling": {
      title: "Spinning - Indoor Cycling",
      startTime: "08:30",
      endTime: "09:20",
      description: "Experience the ultimate high-energy workout with our Spinning class.",
      img: require('../../../assets/images/spin.jpg')
    },
    "zumba-dance": {
      title: "Zumba Dance",
      startTime: "09:30",
      endTime: "10:20",
      description: "Join us for an exhilarating Zumba dance class!",
      img: require('../../../assets/images/zumba.jpg')
    },
    // Add other class details here...
  };

  const currentClass = className ? classDetails[className as string] : null;

  if (!currentClass) {
    return (
      <View style={styles.container}>
        <Text>Class not found TESTTTTTTTTTTTTTTTTTTTTTT</Text>
      </View>
    );
  }

  const handleSubmit = () => {
    // Handle form submission (just an alert for simplicity)
    alert(`Signed up for ${currentClass.title}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.classHeader}>
        <Image source={currentClass.img} style={styles.classImage} />
        <Text style={styles.classTitle}>{currentClass.title}</Text>
      </View>

      <View style={styles.classDetails}>
        <Text><Text style={styles.bold}>Start Time:</Text> {currentClass.startTime}</Text>
        <Text><Text style={styles.bold}>End Time:</Text> {currentClass.endTime}</Text>
        <Text>{currentClass.description}</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Sign Up for {currentClass.title}</Text>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  classHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  classImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  classTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  classDetails: {
    marginVertical: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ClassSignUp;
