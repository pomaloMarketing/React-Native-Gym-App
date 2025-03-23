import { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, ImageBackground, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import classData from "../../data/classData"; // Ensure the import path is correct
import SimpleForm from "../../../components/SimpleForm";  // Import the new form


export default function ClassDetail() {
  const { id } = useLocalSearchParams(); // Get ID from the URL
  const clas = classData.find((c) => c.id === id); // Find class by ID

  // State for form inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  if (!clas) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Class Not Found</Text>
      </View>
    );
  }

  // Function to handle form submission
  const handleSubmit = () => {
    if (!name || !email) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    Alert.alert("Request Sent", `You have signed up to join ${clas.title}`);
    // You could send this data to an API or backend
  };

  return (
    <View style={{ flex: 1 }}>  
      <ImageBackground 
        source={require('../../../assets/images/background.webp')} 
        style={styles.container}
        imageStyle={styles.backgroundImage} 
      >
        <View>
          <Image source={require('../../../assets/images/logo.png')} style={styles.headerLogo} />
        </View>
        <Text style={styles.classtitle}>Our Classes</Text>
      </ImageBackground>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={clas.img} style={styles.image} />
          <Text style={styles.title}>{clas.title}</Text>
          <Text style={styles.description}>{clas.description}</Text>

          {/* Join Class Form */}
          
          <View style={styles.formContainer}>
            {/* Email Form */}
          <SimpleForm classDetails={clas} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerLogo: {
    marginTop: 75,
  },
  backgroundImage: {
    height: 350,

  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  classtitle: {
    fontSize: 22, 
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
  },
  errorText: {
    fontSize: 20,
    color: "red",
  },
  formContainer: {
    width: "100%",
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
});
``