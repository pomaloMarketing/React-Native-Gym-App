import React, { useState, useEffect, useRef } from 'react'; 
import { View, Text, ImageBackground, StyleSheet, Dimensions, FlatList, Image , ScrollView} from 'react-native';
import { Link } from 'expo-router';
import CalendarComponent from '@/components/CalendarComponent';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../services/NotificationService'; 


const { width } = Dimensions.get('window');
const isMobile = width < 768; // Adjust for mobile screens

const classData = [
  {
    title: "Spinning - Indoor Cycling",
    startTime: "08:30",
    endTime: "09:20",
    daysOfWeek: [0], // Monday
    description: "Experience the ultimate high-energy workout with our Spinning - Indoor Cycling class at The Gym For Her.",
    link: "/Classes/spinning-indoor-cycling"
  },
  {
    title: "Zumba Dance",
    startTime: "09:30",
    endTime: "10:20",
    daysOfWeek: [0],
    description: "Join us for an exhilarating Zumba dance class that combines energetic music with dynamic dance moves, creating a fun and effective workout!",
    link: "/Classes/zumba-dance"
  },
  {
    title: "Build Strength & Endurance",
    startTime: "17:30",
    endTime: "18:20",
    daysOfWeek: [0],
    description: "Get ready to challenge yourself in our Build Strength and Endurance class, designed to enhance your overall conditioning and physical fitness!",
    link: "/Classes/zumba-dance"
  },
  {
    title: "Restorative Yoga",
    startTime: "18:30",
    endTime: "19:20",
    daysOfWeek: [0],
    description: "Discover the transformative benefits of yoga in our invigorating classes designed to enhance flexibility while strengthening your mind and body.",
    link: "/Classes/yoga"
  }, 
  // Tuesday Classes
  {
    title: "Strength Boot Camp",
    startTime: "09:00",
    endTime: "09:50",
    daysOfWeek: [1], // Tuesday
    description: "Get ready to unleash your inner strength in our Strength Boot Camp, a dynamic class designed to deliver a comprehensive full-body workout!",
    link: "/Classes/tabata" // Unique path for the class
  },
  {
    title: "Stepping with T Step Aerobics",
    startTime: "17:30",
    endTime: "18:20",
    daysOfWeek: [1],
    description: "Get ready to groove and move in our Steppin' with T Step Aerobics class, where you'll enjoy an hour of fun filled with upbeat music remixes from the 80s, 90s, and 2000s!",
    link: "/Classes/steppin-t" // Unique path for the class
  },
  {
    title: "Drums Alive",
    startTime: "18:30",
    endTime: "19:20",
    daysOfWeek: [1],
    description: "Experience a unique and exhilarating workout with Drums Alive, where music and rhythm come together for an engaging upper-body fitness experience!",
    link: "/Classes/drums-alive" // Unique path for the class
   },

  // Wednesday Classes
  {
    title: "Build Strength & Endurance",
    startTime: "08:30",
    endTime: "09:20",
    daysOfWeek: [2], // Wednesday
    description: "Get ready to challenge yourself in our Build Strength and Endurance class, designed to enhance your overall conditioning and physical fitness!",
    link: "/Classes/tabata" // Unique path for the class
  },
  {
    title: "Drums Alive",
    startTime: "09:30",
    endTime: "10:20",
    daysOfWeek: [2],
    description: "Experience a unique and exhilarating workout with Drums Alive, where music and rhythm come together for an engaging upper-body fitness experience!",
    link: "/Classes/drums-alive" // Unique path for the class
  },
  {
    title: "Zumba",
    startTime: "17:30",
    endTime: "18:20",
    daysOfWeek: [2],
    description: "Join us for an exhilarating Zumba dance class that combines energetic music with dynamic dance moves, creating a fun and effective workout!",
    link: "/Classes/zumba-dance" // Unique path for the class
  },
  {
    title: "Kettlebell",
    startTime: "18:30",
    endTime: "19:20",
    daysOfWeek: [2],
    description: "Grab one of our kettlebells and get ready to transform your fitness routine!",
    link: "/Classes/kettlebell-ampd" // Unique path for the class
  },

  // Thursday Classes
  {
    title: "Tabata / Strength",
    startTime: "08:30",
    endTime: "09:15",
    daysOfWeek: [3], // Thursday
    description: "Are you ready to maximize your workout in minimal time? Join our Tabata class, a high-intensity interval training (HIIT) program designed to push your limits!",
    link: "/Classes/tabata" // Unique path for the class
  },
  {
    title: "Strength in Drumming",
    startTime: "09:30",
    endTime: "10:15",
    daysOfWeek: [3],
    description: "Join us for Strength in Drumming, an exciting class that fuses cardio drumming with strength training for a unique fitness experience!",
    link: "/Classes/drums-alive" // Unique path for the class
  },
  {
    title: "Tabata & Bootcamp",
    startTime: "16:45",
    endTime: "17:30",
    daysOfWeek: [3],
    description: "Get ready to sweat in our Tabata & Bootcamp class, a powerful combination of interval training and strength exercises that will take your fitness to the next level!",
    link: "/Classes/tabata" // Unique path for the class
  },
  {
    title: "Spin & Stretch - Indoor Cycling",
    startTime: "17:30",
    endTime: "18:20",
    daysOfWeek: [3],
    description: "Join us for our invigorating Spin & Stretch class, where the high-energy of indoor cycling meets the calming benefits of stretching!",
    link: "/spinning-indoor-cycling" // Unique path for the class
  },
  {
    title: "Strength Fusion",
    startTime: "18:30",
    endTime: "19:50",
    daysOfWeek: [3],
    description: "Experience the ultimate workout with our Strength Fusion class, where we blend a variety of activities to enhance your strength and overall fitness!",
    link: "/Classes/tabata" // Unique path for the class
  },

  // Friday Classes
  {
    title: "Barre Fusion",
    startTime: "09:00",
    endTime: "09:50",
    daysOfWeek: [4], // Friday
    description: "Discover the perfect blend of strength and grace in our Barre Fusion class, a low-impact workout designed to sculpt and tone your body!",
    link: "/Classes/barre-fusion" // Unique path for the class
  },
  {
    title: "Restorative Yoga",
    startTime: "10:00",
    endTime: "10:50",
    daysOfWeek: [4],
    description: "Discover the transformative benefits of yoga in our invigorating classes designed to enhance flexibility while strengthening your mind and body.",
    link: "/Classes/yoga" // Unique path for the class
  },
  {
    title: "30/30 Strength & Step",
    startTime: "17:30",
    endTime: "18:20",
    daysOfWeek: [4],
    description: "Get ready to elevate your fitness in our 30/30 Strength & Step class, a dynamic fusion of strength training and step aerobics!",
    link: "/Classes/tabata" // Unique path for the class
  },

  // Saturday Classes
  {
    title: "Turbo / Strong Nation Combo",
    startTime: "09:00",
    endTime: "09:50",
    daysOfWeek: [5], // Saturday
    description: "Get ready to unleash your inner athlete in our Turbo / Strong Nation Combo class, a high-energy, full-body HIIT workout designed to push your limits!",
    link: "/Classes/tabata" // Unique path for the class
  },
  {
    title: "Stepping with T Step Aerobics",
    startTime: "10:15",
    endTime: "10:55",
    daysOfWeek: [5],
    description: "Get ready to groove and move in our Steppin' with T Step Aerobics class, where you'll enjoy an hour of fun filled with upbeat music remixes from the 80s, 90s, and 2000s!",
    link: "/Classes/steppin-t" // Unique path for the class
  },
  {
    title: "Pop Up Classes (Random)",
    startTime: "17:30",
    endTime: "18:20",
    daysOfWeek: [5],
    description: "These dynamic classes may include a mix of your favorites, ensuring you always have something new to try.",
    link: "/Classes/steppin-t" // Unique path for the class
  },
];

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
      }
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('User interacted with notification:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const sendPushNotification = async () => {
    if (!expoPushToken) {
      console.log('No Expo Push Token available');
      return;
    }

    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'New Class Alert 🚀',
      body: 'Check out the latest fitness classes at Gym For Her!',
      data: { screen: 'Classes' }
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getClassesForSelectedDate = () => {
    if (!selectedDate) return [];
    const selectedDayOfWeek = new Date(selectedDate).getDay(); // Sunday = 0, Monday = 1, ...
    return classData.filter((classItem) => classItem.daysOfWeek.includes(selectedDayOfWeek));
  };

  return (
    <View style={{ flex: 1 }}>
      
    {/* Background Image - Fixed */}
    <ImageBackground 
      source={require('../../assets/images/background.webp')} 
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.headerLogo} />
        <Text style={styles.gymTitle}>Flushing's Premier Women's Gym</Text>
      </View>
    </ImageBackground>

    {/* Content Below Background */}
    <FlatList
      ListHeaderComponent={(
        <>
          {/* Non-Scrolling Section */}
          <View style={styles.staticContent}>
            <Text style={styles.MainTitle}>Find a Class and Join our Community!</Text>
            <Text style={styles.SubTitle}>
              The Gym For Her is a community for women to have a space to exercise, 
              take part in fitness classes, and learn about health and wellness in a comfortable environment.
            </Text>
            
            <View style={styles.card}>
              <Image style={styles.heroHomeImage} source={require('../../assets/images/drums.jpg')} />
            </View>

            <CalendarComponent onDateSelect={handleDateSelect} />
          </View>
        </>
      )}
      data={selectedDate ? getClassesForSelectedDate() : []}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.classInfoContainer}>
          <Text style={styles.classTitle}>{item.title}</Text>
          <Text style={styles.classTime}>{`${item.startTime} - ${item.endTime}`}</Text>
          <Text style={styles.classDescription}>{item.description}</Text>
          <Link href={item.link} style={styles.link}>
            <Text style={styles.classLink}>Sign Up →</Text>
          </Link>
        </View>
      )}
    />
  </View>
 

    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerContainer: {
    alignItems: "center",
    height: 300,
  },
  gymTitle: {
    fontSize: 22, 
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  staticContent: {
    flex: 0,
    padding: 40,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heroHomeImage: {
    width: 320,
    height: 200,
    margin: "auto",
  },
  headerLogo: {
    margin: 'auto',
    paddingTop: 50,
    paddingBottom: 20,
    height: 150,
    width: 250,
  },
  classInfoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  classTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3C3250',
  },
  classTime: {
    fontSize: 16,
    color: '#3C3250',
    marginVertical: 5,
  },
  classDescription: {
    fontSize: 14,
    color: '#3C3250',
    marginBottom: 15,
  },
  link: {
    textDecorationLine: 'none',
  },
  classLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6ab4', 
    textDecorationLine: "underline",
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
  container: {
    flex: 0,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerLogo: {
    marginTop: 100,
    height: 100,
    width: 200,
  },
  MainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  SubTitle: {
    paddingBottom: 20,
  }
});

export default HomeScreen;
