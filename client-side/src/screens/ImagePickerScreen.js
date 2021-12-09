import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import Svg, { Ellipse } from "react-native-svg";
import {STYLES, COLORS} from '../style/Styles';


import ImagePickerComponent from '../components/ImagePickerComponent';

const ImagePickerScreen = () => {
  
    // setImageSource(result.assets[0].uri);

  

  return (
    <>
    <View style={styles.body}>
        <View style={styles.ellipseStack}>
          <Svg viewBox="0 0 849.43 890.3" style={styles.ellipse}>
            <Ellipse
              strokeWidth={1}
              fill="rgba(255,255,255,1)"
              cx={430}
              cy={445}
              rx={429}
              ry={445}
            ></Ellipse>
          </Svg>
          <Text style={styles.headerText}>Оберіть зображення для зчитування</Text>
          <ImagePickerComponent/>
        </View>
      </View>
  </>

   
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)",
    justifyContent: "center"
  },
  body: {
    backgroundColor: "#1fb2cc",
    width:460,
    height: 840,
    alignSelf: "center"
    
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 809,
    height: 890,
    position: "absolute"
  },
  headerText: {
    top: 14,
    left: 143,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    fontWeight:'bold',
    fontSize: 15,
    textAlign: "center"
  },
  ellipseStack: {
    width: 859,
    height: 990,
    marginTop: 23,
    marginLeft: -50
  }
});
export default ImagePickerScreen;
