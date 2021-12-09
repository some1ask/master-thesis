import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const LoginScreen = () => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.background}>
        <ImageBackground
          style={styles.rect}
          imageStyle={styles.rect_imageStyle}
          source={require("../assets/Gradient_nZzWfbG.png")}
        >
          <View style={styles.icon2Row}>
            <Icon name="cellphone-iphone" style={styles.icon2}></Icon>
            <Text style={styles.textRecognition}>Text {"\n"}Recognition</Text>
          </View>
          <View style={styles.rect2}></View>
          <Text style={styles.loremIpsum}>
            Зачекайте будь-ласка, встановлюється зв&#39;язок {"\n"}із
            сервером...
          </Text>
          <ActivityIndicator
            color="rgba(255,255,255,1)"
            size="large"
            style={styles.activityIndicator}
          ></ActivityIndicator>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  background: {
    flex: 1
  },
  rect: {
    flex: 1
  },
  rect_imageStyle: {},
  icon2: {
    color: "rgba(19,45,75,1)",
    fontSize: 76,
    height: 84,
    width: 76
  },
  textRecognition: {
    fontFamily: "roboto-700",
    color: "rgba(39,52,68,1)",
    textAlign: "left",
    fontSize: 35
  },
  icon2Row: {
    height: 84,
    flexDirection: "row",
    marginTop: 181,
    marginLeft: 44,
    marginRight: 51
  },
  rect2: {
    width: 271,
    height: 5,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 12,
    marginLeft: 44
  },
  loremIpsum: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 15,
    marginTop: 88,
    alignSelf: "center"
  },
  activityIndicator: {
    flex:1,
    marginTop: 95,
  }
});

export default LoginScreen;
