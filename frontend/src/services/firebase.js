import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCS75gM39-68ObKe5j3zcqfM6Tpejc5Jzw",
    authDomain: "remitano-dev-test.firebaseapp.com",
    projectId: "remitano-dev-test",
    storageBucket: "remitano-dev-test.appspot.com",
    messagingSenderId: "668348834121",
    appId: "1:668348834121:web:cf73ba1492cc919118ba98",
    measurementId: "G-S3Y8XE9SSH"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
