import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import LogIn from './LogIn';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const SignUp = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const navigation = useNavigation<any>();
  const registerUser = () => {
    const userId = uuid.v4();
    firestore()
      .collection('user')
      .doc(userId)
      .set({
        username: username,
        email: email,
        phone: phone,
        password: password,
        userId: userId,
      })
      .then(res => {
        Alert.alert('user created successfully');
        navigation.navigate(LogIn);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={[styles.input, {marginTop: 20}]}
        placeholder="Enter Email Id"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={[styles.input, {marginTop: 20}]}
        keyboardType="number-pad"
        placeholder="Enter Mobile"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        style={[styles.input, {marginTop: 20}]}
        placeholder="Enter Password"
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={[styles.input, {marginTop: 20}]}
        placeholder="Conform Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.btn} onPress={() => registerUser()}>
        <Text style={styles.btnText}>SignUp</Text>
      </TouchableOpacity>
      <Text style={styles.orlogin} onPress={() => navigation.goBack()}>
        Or LogIn
      </Text>
    </View>
  );
};

export default SignUp;

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
