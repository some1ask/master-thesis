import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator
} from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { pickerLanguages } from '../assets/pickerLanguages';
import { Picker } from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { addText, sendPicture, uniqueID } from '../network/userRequests';


const ImagePickerComponent = () =>{
    const [imageSource, setImageSource] = useState(null);
    const [selectedLanguage,setSelectedLanguage] = useState(pickerLanguages[0].value);
    const [bodyObject,setBodyObject] = useState({"language":selectedLanguage});
    const [isSend,setIsSend] = useState(false);

    const navigation = useNavigation();

    const imageOptions = {
        mediaType: 'photo',
        includeBase64: true,
        savetoPhotos:true,
      };
    
      const selectImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibrary(imageOptions);
        if(!result.didCancel){
          setImageSource(result.assets[0].uri);
          setBodyObject({...bodyObject,"type":result.assets[0].type,"base64":result.assets[0].base64})
        }
      };
      
      const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "App Camera Permission",
              message:"App needs access to your camera ",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera permission given");
            let result = await ImagePicker.launchCamera(imageOptions);
            setImageSource(result.assets[0].uri);
            setBodyObject({...bodyObject,"type":result.assets[0].type,"base64":result.assets[0].base64})
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
        };
        return(
            <>
           <View style={styles.container}>
      <View style={styles.rect}>
        <Icon name="camera" onPress={requestCameraPermission} style={styles.icon2}></Icon>
        <Icon name="photo" onPress={selectImageFromGallery} style={styles.icon}></Icon>
      </View>
    </View>
          {imageSource ? (
            <>
            <View style={styles.container}>
      <View style={styles.rect2}>
        <Image
          source={{uri:imageSource}}
          resizeMode="cover"
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.rect3}>
      <Picker
        enabled
        selectedValue={selectedLanguage}
        style={styles.picker }
        onValueChange={(itemValue, itemIndex) => {
          console.log(itemValue)
          setSelectedLanguage(itemValue);
          setBodyObject({...bodyObject,"language":itemValue})
          // console.log(selectedLanguage)
        }
      }
      >
        {
            pickerLanguages.map((item,index) =>{
                return <Picker.Item label={item.label} value={item.value} key={index}/>
            })

        }      
      </Picker>
      </View>
      <View style={styles.button}>
      <Button
      
  onPress={()=>{
    setIsSend(true);
    sendPicture(bodyObject).then(data =>{
      addText(data.recognizedText).then(navigation.navigate("Home"))
    }).then(()=>{
      setImageSource("")
      setIsSend(false);
    })
   
  }}
  title="Відправити текст"
  color="#056469"
  accessibilityLabel="Learn more about this purple button"
/>
{
  isSend ? <ActivityIndicator
  color="#056469"
  size="large"
  style={styles.activityIndicator}
  ></ActivityIndicator> : <></>
}

</View>
    </View>
            </>
          ) : (<></>)}
           
          </>
        )

}
const styles = StyleSheet.create({
  mainWrapper:{
    height:40,
  },
  container: {
    width: 262,
    height: 85
  },
  container2:{
    width: 324,
    height: 449
  },
  rect: {
    width: 291,
    height: 135,
    marginTop: 45,
    marginHorizontal:135
  },
  activityIndicator: {
    flex:1,
    marginTop: 95,
  },
  button:{
    // alignSelf:'center',
    // marginHorizontal:120,
    left:150,
    marginTop:50
  },
  icon2: {
    color: "rgba(21,121,137,1)",
    fontSize: 80,
    height: 90,
    width: 90,
    marginTop: 25,
    marginLeft: 145
  },
  icon: {
    color: "rgba(21,121,137,1)",
    fontSize: 85,
    height: 90,
    width: 90,
    marginTop: -90,
    marginLeft: 35
  },
  rect2: {
    width: 324,
    height: 245,
  
    marginLeft:115,
  
    marginTop: 104
  },
  image: {
    width: 324,
    height: 245
  },
  rect3: {
    borderWidth:1,
    borderColor:"#000",
    width: 200,
    height: 59,
    backgroundColor: "transparent",
    marginTop: 10,
    marginLeft:160
  },
  picker:{ 
    height: 20,
    width: 200, 
    textAlign:"center"
  }
});
export default ImagePickerComponent;




 