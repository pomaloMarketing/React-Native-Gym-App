// app/(tabs)/classes.tsx

import React from 'react';
import { View, Text, FlatList, Pressable, Image, StyleSheet, ImageBackground } from 'react-native';
import { Link } from 'expo-router';


const classList = [
  {
    id: 'spinning-indoor-cycling',
    title: 'Spinning - Indoor Cycling',
    img: require('../../assets/images/spin.jpg'),
    description: 'Hop on one of specially designed indoor cycles and join our group cyling course. This group course is lead by a certified coach for a fun, effective workout.',
  },
  {
    id: 'zumba-dance',
    title: 'Zumba Dance',
    img: require('../../assets/images/zumbda.jpg'),
    description: 'Join us for an exhilarating Zumba dance class!',
  },
  {
    id: 'drums-alive',
    title: 'Drums Alive',
    img: require('../../assets/images/drums.jpg'),
    description: 'Combining music and rhythm with a great upper-body focused workout, Drums Alive is fun, engaging workout. This workout is challenging not only physically, but mentally!',
  },
  {
    id: 'kettlebell-ampd',
    title: 'Kettlebell Ampd',
    img: require('../../assets/images/kettlebell.jpg'),
    description: 'Grab one of our kettbells and get ready to build functional strength! This workout involves several kettlebell moves designed to increase your strength and cardio. Kettlebell Ampd is an popular class for a reason.. it works!',
  },
  {
    id: 'tabata',
    title: 'Tabata',
    img: require('../../assets/images/tababta.jpg'),
    description: 'Looking to get the maximum amount in the shortest amount of time? Tabata is a high intensity interval training (HITT) program that focusing on plyometric movements with short rest periods. Challenge yourself and try one of these popluar classes!',
  },
  {
    id: 'kick-punch',
    title: 'Kick, Punch & Strike',
    img: require('../../assets/images/kick.jpg'),
    description: 'Think Zumba, but with plenty of punches and kicks! This class is action packed!',
  },
  {
    id: 'pound',
    title: 'Pound',
    img: require('../../assets/images/pound.jpg'),
    description: 'Grab some drumsticks and get ready to rock! Drum and jam along with the beat in this high-energy, fun workout!',
  },
  {
    id: 'power-flow',
    title: 'Power Flow & Burn Fusion',
    img: require('../../assets/images/power-flow.jpg'),
    description: 'This class combines yoga movements, and band workouts into one great workout. Fans of band resistance training will enjoy this one!',
  },
  {
    id: 'barre-fusion',
    title: 'Barre Fusion',
    img: require('../../assets/images/barre.jpg'),
    description: 'This class is all about toning your body using body-weight workouts to increase strength and flexibility!',
  },
  {
    id: 'steppin-t',
    title: 'Steppin with T Step Aerobics',
    img: require('../../assets/images/steppin.jpg'),
    description: 'Join us for an hour of fun with music remixes from the 80’s, 90’s, and 2000’s. Step is a low-impact, high energy workout. No experience necessary and all fitness levels welcome! If you can walk, you can step!',
  },
  {
    id: 'yoga',
    title: 'Yoga',
    img: require('../../assets/images/yoga.jpg'),
    description: 'Want to increase your flexibility while you strengthen your mind and body? Join us for a Yoga class. Classes incorporate meditation, stretching, and various practices geared toward resetting the nervous system to aid in mental and physical health. All levels welcome!',
  },

  // Add more classes here as needed
];


export default function ClassesPage() {
  return (
    <ImageBackground 
      source={require('../../assets/images/background.webp')} 
      style={styles.container}
      imageStyle={styles.backgroundImage} 
    >
      <View>
        <Image source={require('../../assets/images/logo.png')} style={styles.headerLogo} />
      </View>
      <Text style={styles.title}>Our Classes</Text>
      <FlatList
        data={classList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/classes/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <Image source={item.img} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.classTitle}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    textAlign: 'center',
    color: 'white',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: 300,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  classTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
});
