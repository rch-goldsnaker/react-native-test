// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDmicluz6cELrBMGIhi1g9EWGB5BDgvnLU",
  authDomain: "login-react-native-e3477.firebaseapp.com",
  projectId: "login-react-native-e3477",
  storageBucket: "login-react-native-e3477.appspot.com",
  messagingSenderId: "788121515812",
  appId: "1:788121515812:web:a4567f72ff41e09046e5b1",
  measurementId: "G-LSDEBXTLJ4"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// const analytics = getAnalytics(app);