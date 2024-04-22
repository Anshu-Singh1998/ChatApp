import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {useEffect} from 'react';

import {View, Text, StyleSheet} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 3000);
  }, []);

  const checkLogin = async () => {
    const id = await AsyncStorage.getItem('UserID');
    if (id !== null) {
      navigation.navigate('MainScreen');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Welcome To Chat App</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default Splash;
