// app/(tabs)/classes.tsx

import React from 'react';
import { View, Text, FlatList, Pressable, Image, StyleSheet, ImageBackground } from 'react-native';
import { Link } from 'expo-router';

const classList = [
  {
    id: 'spinning-indoor-cycling',
    title: 'Spinning - Indoor Cycling',
    img: require('../../assets/images/spin.jpg'),
    description: 'Experience the ultimate high-energy workout with our Spinning class.',
  },
  {
    id: 'zumba-dance',
    title: 'Zumba Dance',
    img: require('../../assets/images/zumbda.jpg'),
    description: 'Join us for an exhilarating Zumba dance class!',
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
