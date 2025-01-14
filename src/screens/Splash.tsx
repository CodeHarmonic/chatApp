import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation<any>();

  const checkLogin = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      if (id !== null) {
        navigation.navigate('Main'); // Use screen name as defined in your navigation stack
      } else {
        navigation.navigate('LogIn'); // Use screen name as defined in your navigation stack
      }
    } catch (error) {
      console.error('Error reading userId from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Where You</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
});
