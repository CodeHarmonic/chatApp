import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import SignUp from './SignUp';
import Loding from '../Components/Loding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Main from './Main';

const LogIn = () => {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [visible, setvisible] = React.useState(false);
  const navigation = useNavigation<any>();

  const loginUser = () => {
    setvisible(true);
    firestore()
      .collection('user')
      .where('email', '==', email)
      .get()
      .then(res => {
        setvisible(false);
        // Alert.alert(JSON.stringify(res.docs[0].data()));
        goTonext(
          res.docs[0].data().username,
          res.docs[0].data().email,
          res.docs[0].data().userId,
        );
      })
      .catch(error => {
        setvisible(false);
        Alert.alert('user not found');
      });
  };
  const goTonext: any = async (username: any, email: any, userId: any) => {
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('userId', userId);
    navigation.navigate(Main);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LogIn</Text>
      <TextInput
        style={[styles.input, {marginTop: 100}]}
        placeholder="Enter Email Id"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={[styles.input, {marginTop: 20}]}
        placeholder="Enter Password"
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity style={styles.btn} onPress={() => loginUser()}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.orlogin} onPress={() => navigation.navigate(SignUp)}>
        Or SigUp
      </Text>
      <Loding visible={visible} />
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginVertical: 20,
    fontWeight: '600',
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 50,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  btn: {
    width: '90%',
    height: 50,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 50,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
  orlogin: {
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 20,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textDecorationColor: 'blue',
    color: 'blue',
    cursor: 'pointer',
  },
});
