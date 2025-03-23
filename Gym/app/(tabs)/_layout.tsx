import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Image, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home', 
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="Classes" // Use the folder name, not "classes"
        options={{ 
          title: 'Classes', 
          tabBarIcon: ({ color, size }) => <Ionicons name="bicycle" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="Instructors" 
        options={{ 
          title: 'Instructors', 
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="about" 
        options={{ 
          title: 'About', 
          tabBarIcon: ({ color, size }) => <Ionicons name="information-circle" size={size} color={color} />
        }} 
      />
       {/* Hide dynamic routes */}
       <Tabs.Screen
        name="Classes/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="Instructors/[id]"
        options={{ href: null }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#5F506B', // Purple background
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 10,
    zIndex: 1000,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
});
