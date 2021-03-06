import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, STYLES } from '../../style/Styles';
import ImagePickerScreen from '../../screens/ImagePickerScreen';
import Home from '../../screens/Home';
import Login from '../../screens/LoginScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const screenOptions = (route, color) => {
    let iconName;

    switch (route.name) {
      case 'Тексти':
        iconName = 'file-text';
        break;
      case 'Розпізнати':
        iconName = 'camera';
        break;
      default:
        break;
    }

    return <Icon name={iconName} color='#fff' size={24} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions(route, color),
        headerShown:false,
        tabBarStyle:{backgroundColor:"#0C3F48"},
      })}>
     
      <Tab.Screen name="Розпізнати" component={ImagePickerScreen} tabBarItemStyle={{color:'#fff'}}/>
      <Tab.Screen name="Тексти" component={Home} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
