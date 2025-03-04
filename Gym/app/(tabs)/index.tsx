import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import { Link } from 'expo-router';
import CalendarComponent from '@/components/CalendarComponent';

const { width } = Dimensions.get('window');
const isMobile = width < 768; // Adjust for mobile screens

const classData = [
  {
    title: "Spinning - Indoor Cycling",
    startTime: "08:30",
    endTime: "09:20",
    daysOfWeek: [0], // Monday
    description: "Experience the ultimate high-energy workout with our Spinning - Indoor Cycling class at The Gym For Her.",
    link: "/sign-up/spinning-indoor-cycling"
  },
  {
    title: "Zumba Dance",
    startTime: "09:30",
    endTime: "10:20",
    daysOfWeek: [0],
    description: "Join us for an exhilarating Zumba dance class that combines energetic music with dynamic dance moves, creating a fun and effective workout!",
    link: "/sign-up/zumba-dance"
  },
  {
    title: "Build Strength & Endurance",
    startTime: "17:30",
    endTime: "18:20",
    daysOfWeek: [0],
    description: "Get ready to challenge yourself in our Build Strength and Endurance class, designed to enhance your overall conditioning and physical fitness!",
    link: "/sign-up/build-strength"
  },
  {
    title: "Restorative Yoga",
    startTime: "18:30",
    endTime: "19:20",
    daysOfWeek: [0],
    description: "Discover the transformative benefits of yoga in our invigorating classes designed to enhance flexibility while strengthening your mind and body.",
    link: "/sign-up/restorative-yoga"
  }, 
  // Tuesday Classes
  {
    title: "Strength Boot Camp",
    startTime: "09:00",
    endTime: "09:50",
    daysOfWeek: [1], // Tuesday
    description: "Get ready to unleash your inner strength in our Strength Boot Camp, a dynamic class designed to deliver a comprehensive full-body workout!",
    link: "/sign-up/strength-boot-camp" // Unique path for the class
  },
  {
    title: "Stepping with T Step Aerobics",
    startTime: "17:30",
    endTime: "18:20",
    daysOfWeek: [1],
    description: "Get ready to groove and move in our Steppin' with T Step Aerobics class, where you'll enjoy an hour of fun filled with upbeat music remixes from the 80s, 90s, and 2000s!",
    link: "/sign-up/stepping-with-t" // Unique path for the class
  },
  {
    title: "Drums Alive",
    startTime: "18:30",
    endTime: "19:20",
    daysOfWeek: [1],
    description: "Experience a unique and exhilarating workout with Drums Alive, where music and rhythm come together for an engaging upper-body fitness experience!",
    link: "/sign-up/drums-alive" // Unique path for the class
   },

  // Wednesday Classes
  {
    title: "Build Strength & Endurance",
    startTime: "08:30",
    endTime: "09:20",
    daysOfWeek: [2], // Wednesday
    description: "Get ready to challenge yourself in our Build Strength and Endurance class, designed to enhance your overall conditioning and physical fitness!",
    link: "/sign-up/build-strength" // Unique path for the class
  },
  {
    title: "Drums Alive",
    startTime: "09:30",
    endTime: "10:20",
    daysOfWeek: [2],
    description: "Experience a unique and exhilarating workout with Drums Alive, where music and rhythm come together for an engaging upper-body fitness experience!",
    link: "/sign-up/drums-alive-wednesday" // Unique path for the class
  },
  {
    title: "Zumba",
    startTime: "17:30",
    endTime: "18:20",
    daysOfWeek: [2],
    description: "Join us for an exhilarating Zumba dance class that combines energetic music with dynamic dance moves, creating a fun and effective workout!",
    link: "/sign-up/zumba-wednesday" // Unique path for the class
  },
  {
    title: "Kettlebell",
    startTime: "18:30",
    endTime: "19:20",
    daysOfWeek: [2],
    description: "Grab one of our kettlebells and get ready to transform your fitness routine!",
    link: "/sign-up/kettlebell-wednesday" // Unique path for the class
  },

  // Thursday Classes
  {
    title: "Tabata / Strength",
    startTime: "08:30",
    endTime: "09:15",
    daysOfWeek: [3], // Thursday
    description: "Are you ready to maximize your workout in minimal time? Join our Tabata class, a high-intensity interval training (HIIT) program designed to push your limits!",
    link: "/sign-up/tabata-thursday" // Unique path for the class
  },
  {
    title: "Strength in Drumming",
    startTime: "09:30",
    endTime: "10:15",
    daysOfWeek: [3],
    description: "Join us for Strength in Drumming, an exciting class that fuses cardio drumming with strength training for a unique fitness experience!",
    link: "/sign-up/strength-drumming" // Unique path for the class
  },
  {
    title: "Tabata & Bootcamp",
    startTime: "16:45",
    endTime: "17:30",
    daysOfWeek: [3],
    description: "Get ready to sweat in our Tabata & Bootcamp class, a powerful combination of interval training and strength exercises that will take your fitness to the next level!",
    link: "/sign-up/thursday-bootcamp" // Unique path for the class
  },
  {
    title: "Spin & Stretch - Indoor Cycling",
    startTime: "17:30",
    endTime: "18:20",
    daysOfWeek: [3],
    description: "Join us for our invigorating Spin & Stretch class, where the high-energy of indoor cycling meets the calming benefits of stretching!",
    link: "/sign-up/thursday-spin" // Unique path for the class
  },
  {
    title: "Strength Fusion",
    startTime: "18:30",
    endTime: "19:50",
    daysOfWeek: [3],
    description: "Experience the ultimate workout with our Strength Fusion class, where we blend a variety of activities to enhance your strength and overall fitness!",
    link: "/sign-up/thursday-fusion" // Unique path for the class
  },

  // Friday Classes
  {
    title: "Barre Fusion",
    startTime: "09:00",
    endTime: "09:50",
    daysOfWeek: [4], // Friday
    description: "Discover the perfect blend of strength and grace in our Barre Fusion class, a low-impact workout designed to sculpt and tone your body!",
    link: "/sign-up/friday-zumba" // Unique path for the class
  },
  {
    title: "Restorative Yoga",
    startTime: "10:00",
    endTime: "10:50",
    daysOfWeek: [4],
    description: "Discover the transformative benefits of yoga in our invigorating classes designed to enhance flexibility while strengthening your mind and body.",
    link: "/sign-up/resotrative-yoga-friday" // Unique path for the class
  },
  {
    title: "30/30 Strength & Step",
    startTime: "17:30",
    endTime: "18:20",
    daysOfWeek: [4],
    description: "Get ready to elevate your fitness in our 30/30 Strength & Step class, a dynamic fusion of strength training and step aerobics!",
    link: "/sign-up/friday-30" // Unique path for the class
  },

  // Saturday Classes
  {
    title: "Turbo / Strong Nation Combo",
    startTime: "09:00",
    endTime: "09:50",
    daysOfWeek: [5], // Saturday
    description: "Get ready to unleash your inner athlete in our Turbo / Strong Nation Combo class, a high-energy, full-body HIIT workout designed to push your limits!",
    link: "/sign-up/saturday-turbo" // Unique path for the class
  },
  {
    title: "Stepping with T Step Aerobics",
    startTime: "10:15",
    endTime: "10:55",
    daysOfWeek: [5],
    description: "Get ready to groove and move in our Steppin' with T Step Aerobics class, where you'll enjoy an hour of fun filled with upbeat music remixes from the 80s, 90s, and 2000s!",
    link: "/sign-up/saturday-step" // Unique path for the class
  },
  {
    title: "Pop Up Classes (Random)",
    startTime: "17:30",
    endTime: "18:20",
    daysOfWeek: [5],
    description: "These dynamic classes may include a mix of your favorites, ensuring you always have something new to try.",
    link: "/sign-up/saturday-pop" // Unique path for the class
  },
];

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getClassesForSelectedDate = () => {
    if (!selectedDate) return [];
    const selectedDayOfWeek = new Date(selectedDate).getDay(); // Sunday = 0, Monday = 1, ...
    return classData.filter((classItem) => classItem.daysOfWeek.includes(selectedDayOfWeek));
  };

  return (
    <ImageBackground source={require('../../assets/images/background.webp')} style={styles.background}>
     <View>
        <Image source={require('../../assets/images/logo.png')} style={styles.headerLogo} />
    </View>



    <FlatList
      ListHeaderComponent={
        <>
          {/* <View style={[styles.overlay, { maxWidth: isMobile ? '90%' : 600 }]}>
            <Text style={styles.title}>The Gym for Her</Text>
           
            <Link href="/classes" asChild>
              <Text style={styles.buttonText}>Explore More</Text>
            </Link>
          </View> */}
          <CalendarComponent onDateSelect={handleDateSelect} />
        </>
      }
      data={selectedDate ? getClassesForSelectedDate() : []}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.classInfoContainer}>
          <Text style={styles.classTitle}>{item.title}</Text>
          <Text style={styles.classTime}>{`${item.startTime} - ${item.endTime}`}</Text>
          <Text style={styles.classDescription}>{item.description}</Text>
        </View>
      )}
    />
  </ImageBackground>
  )
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerLogo: {
    margin: 'auto',
    marginTop: 80,
    paddingBottom: 20,
    height: 150,
    width: 250,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 100,
    marginBottom: 20, 
  },
  overlay: {
    backgroundColor: 'rgba(60, 50, 80, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C3250',
  },
  classInfoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    margin: "auto",
    maxWidth: 400,
  },
  classTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3C3250',
  },
  classTime: {
    fontSize: 16,
    color: '#3C3250',
  },
  classDescription: {
    fontSize: 14,
    color: '#3C3250',
    textAlign: 'center',
  },
});

export default HomeScreen;
