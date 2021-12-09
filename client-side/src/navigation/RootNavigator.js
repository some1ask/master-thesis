import React, { useEffect, useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import TabNavigator from './TabNavigator';
import Login from '../screens/LoginScreen';
import { registerUser } from '../network/userRequests';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      setLoggedIn(registerUser)
    },5000)
  },[])
    


  return (
    <NavigationContainer> 
      {
        !isLoggedIn ? (<Login />) : (<TabNavigator/>)
      }  
    </NavigationContainer>
  );


};

export default RootNavigator;