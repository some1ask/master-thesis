import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Clipboard from '@react-native-clipboard/clipboard';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';


import { useEffect } from 'react';
import { getData, user,deleteText} from '../network/userRequests';
import { useState } from 'react';

const {width} = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.5;

const Home = () => {
  const [myData,setMyData] = useState([]);  
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    getData().then(data=>{
      setMyData(data)
    }).then(()=>{
      setLoading(false)
    })
    },[myData])
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <View style={styles.scrollContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Мої Тексти</Text>
      </View>
        <ScrollView
          indicatorStyle="white"
          contentContainerStyle={[
            styles.scrollContentContainer,
            {paddingBottom: tabBarHeight},
          ]}>{
            myData && !loading ? (<>
            {
              myData.map((item,id)=>(
                  <View style={styles.rectcontainer} key={id}>
                  <View style={styles.rect}>
                    <ScrollView style={{paddingBottom:10}}>
                    <TouchableOpacity onPress={() => Clipboard.setString(item.text)}>
                    <View>
                    <Text  style={styles.loremIpsum}>{item.text}</Text>
                    </View>
                    </TouchableOpacity>
                    </ScrollView>
                    
                    <View style={styles.iconRow}>
                    <Icon  name='remove-circle-outline' color='#FA8072' size={46} onPress={()=>{deleteText(item.text)}}/>
                  </View>
                  </View>
                  
                  </View>
              ))
            }
            
            </>)
               
            
           
:  (<ActivityIndicator
color="rgba(255,255,255,1)"
size="large"
style={styles.activityIndicator}
></ActivityIndicator>)
          }

        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1fb2cc"
  },
  contentContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom:2,
  },
  title: {

    fontFamily: "roboto-700",
    color: "#121212",
    fontWeight:'bold',
    fontSize: 15,
    textAlign: "center"
  },
  scrollContainer: {
    backgroundColor: "#1fb2cc",
    flex:1,

  },
  iconRow:{
    alignSelf:'center',
    marginTop:10,
    borderWidth:1,
    borderColor:"#000"
  },
  scrollContentContainer: {
    alignItems: 'center',
    justifyContent:'space-between'
  },
  imageContainer: {
    marginBottom: 14,
  },
  imageCard: {
    borderRadius: 14,
   
  },
  rectcontainer:{
    flex:1,
    alignItems:'center',

    
  },
  rect: {
    width:ITEM_WIDTH,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "#000000",
    marginHorizontal:20,
    marginTop:10
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#000",
    paddingHorizontal:20,
    paddingTop:10,
  },
  activityIndicator: {
    flex:1,
    marginTop: 95,
  }
});

export default Home;
