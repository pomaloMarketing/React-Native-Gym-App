import { View, Text, ImageBackground, Image, ScrollView, StyleSheet } from 'react-native';

export default function About() {
  return (
    <View style={{ flex: 1 }}>  
         <ImageBackground 
           source={require('../../assets/images/background.webp')} 
           style={styles.container}
           imageStyle={styles.backgroundImage} 
         >
           <View>
             <Image source={require('../../assets/images/logo.png')} style={styles.headerLogo} />
           </View>
           <Text style={styles.classtitle}>About The Gym For Her</Text>
         </ImageBackground>
   
   
   
   
   
       <ScrollView contentContainerStyle={styles.container}>
         
         <Text style={styles.MainTitle}>Welcome to Flushing's Premier Women's Gym</Text>
         <Text style={styles.SubTitle}>The Gym For Her is a community for women to have a space to exercise, take part in fitness classes, and learn about health and wellness in a comfortable environment.</Text>
         
         <View style={styles.card}>
          <Image style={styles.cardImage} source={require('../../assets/images/groupFitness.jpg')} ></Image>
          <Text style={styles.cardTitle}>Group Fitness Classes</Text>
          <Text style={styles.cardSubContent}>Dive into our diverse range of over 15 group workout classes, meticulously designed to cater to every fitness level and interest. Whether you're a yoga enthusiast, a cardio lover, or a weightlifting pro, our classes offer something for everyone. Check out our schedule to find the perfect class for you!</Text>
         
         </View>

         <View style={styles.card}>
          <Image style={styles.cardImage} source={require('../../assets/images/gymEquip.jpg')} ></Image>
          <Text style={styles.cardTitle}>24/7 Access to Cardio & Weight Machines</Text>
          <Text style={styles.cardSubContent}>Our facility is equipped with a variety of weight and cardio machines, offering members the flexibility to work out whenever suits them best. Forget about traditional gym hours and embrace a fitness journey that adapts to your schedule.</Text>
         
         </View>


         <View style={styles.card}>
          <Image style={styles.cardImage} source={require('../../assets/images/groupFitness.jpg')} ></Image>
          <Text style={styles.cardTitle}>Personal Training</Text>
          <Text style={styles.cardSubContent}>Our dedicated personal training sessions are tailored to empower women on their journey to becoming stronger and healthier. In a supportive and enjoyable environment, our expert trainers work with you one-on-one, ensuring that every session is not only effective but also a source of inspiration.</Text>
         
         </View>
       </ScrollView>
   
       </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 40,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#e4e4e4",
    padding: 20,
    marginTop: 20,
  },
  cardImage: {
    width: 300,
    height: 200,
    margin: "auto",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  }, 
  cardSubContent: {

  },
  MainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  classtitle: {
    fontSize: 22, 
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  headerLogo: {
    marginTop: 75,
  },
  backgroundImage: {
    height: 300,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
 
 
});
