import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    top: 0,
    backgroundColor: '#5F506B', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 450, 
    height: 50,
    resizeMode: 'contain',
  },
});

export default Header;
