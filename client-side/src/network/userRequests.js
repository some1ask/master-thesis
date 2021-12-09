import { getUniqueId, getManufacturer } from 'react-native-device-info';
import uuid from 'react-native-uuid';
import { db } from '../config/firebase';
import firebase from 'firebase/app';
const uniqueID = getUniqueId();

const user = db.collection('users').doc(uniqueID);
const newUser = {
    texts:[
        {
            text:""
        }
    ]
}

const registerUser = async()=>{
    try{
        user.get().then((snapShot)=>{
            if (snapShot.exists) {
                console.log("user exists!")
                return true; 
            }
            else{
                user.set(newUser);
                return true;
            }
        })
    }
    catch(e){
        console.warn(e)
    }
   
} 
const sendPicture = async(bodyObject) =>{
    try{
    let response =  await fetch(`http://192.168.1.6:5000/${uniqueID}`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(bodyObject)
  })
  let json = await response.json();
  return json;
}
catch(e){
    console.warn(e)
}
}
const addText = async(text)=>{
    try{
        user.update({
            texts:firebase.firestore.FieldValue.arrayUnion({"text":text})
        })
       }
    catch(e){
        console.warn(e)
    }
}
const deleteText = async(text)=>{
    try{
        user.update({
            texts:firebase.firestore.FieldValue.arrayRemove({"text":text})
        })
       }
    catch(e){
        console.warn(e)
    }
}
const getData = async()=>{
    let response = user.get();
    if((await response).exists){
       return (await response).data().texts
    }
}
export{registerUser,uniqueID,sendPicture,addText,user,getData,deleteText}