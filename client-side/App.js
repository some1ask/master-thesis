import React, { useEffect } from 'react';
import {StatusBar} from 'react-native';
import {enableScreens} from 'react-native-screens'
import RootNavigator from './src/navigation/RootNavigator';
import Login from './src/screens/LoginScreen';
import firebase from 'firebase';

export default function () {


  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <RootNavigator />
    </>
  );
}
