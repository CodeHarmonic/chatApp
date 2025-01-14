import React from 'react';
import {View, Text} from 'react-native';
import AppNavigator from './src/navigation/appNavigator';
import {initializeApp, getApps} from '@react-native-firebase/app';

// Firebase Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAXio_tPKuNnvGfGoG6YEnsq1KPtmpjVVA',
  authDomain: 'chatapp-c8945.firebaseapp.com',
  databaseURL: 'https://chatapp-c8945.firebaseio.com',
  projectId: 'chatapp-c8945',
  storageBucket: 'chatapp-c8945.appspot.com',
  messagingSenderId: '768128520935',
  appId: '1:768128520935:android:31c396317f8a4c1bbb0842',
};

const App = () => {
  // Initialize Firebase if it hasn't been initialized yet
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  return <AppNavigator />;
};

export default App;
