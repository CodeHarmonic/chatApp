import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Chat from '../screens/Chat';
import LogIn from '../screens/LogIn';
let id: any = '';
console.log(id, 'kkkkk');
const Users = () => {
  const [users, setUsers] = React.useState<any>([]);
  const navigation = useNavigation<any>();
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers: any = async () => {
    id = await AsyncStorage.getItem('userId');
    let temData: any = [];
    const email = await AsyncStorage.getItem('email');
    firestore()
      .collection('user')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res.docs.length > 0) {
          //   setUsers(res?.docs);
          res?.docs.map((item: any) => {
            temData.push(item.data());
          });
        }
        setUsers(temData);
      });
    // const query = userRef.where('email', '==', email);
    // const snapshot = await query.get();
    // const users = snapshot.docs.map(doc => doc.data());
  };
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.navigate('LogIn');
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Where you can find us Chat App</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.itemUser}
              onPress={
                () => navigation.navigate('Chat', {item: item, id: id}) // Corrected line
              }>
              <Image
                source={require('../screens/Images/superhero.png')}
                style={styles.userIcon}
              />
              <Text style={styles.name}>{item?.username}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    color: 'purple',
    fontSize: 20,
    fontWeight: '600',
  },
  itemUser: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    height: 60,
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: 20,
  },
  userIcon: {
    width: 40,
    height: 40,
  },
  name: {
    color: 'black',
    marginLeft: 20,
    fontSize: 20,
  },
  logoutButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'purple',
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
