// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
import firebase from 'firebase/app';
import {firebaseConfig} from './firebaseConfiguration';
// require('@firebase/firestore')

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }


const db = firebase.firestore();
// db.enablePersistence();
db.settings({ experimentalForceLongPolling: true,merge:true});

export {db};
// Initialize Firebase
