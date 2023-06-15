import firebase from "firebase";
// import firebase from 'firebase/app';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvsU1CULjStMeaPsJDAJ74y02kmrqcZDE",
  authDomain: "beejbhandar-c3990.firebaseapp.com",
  databaseURL: "https://beejbhandar-c3990-default-rtdb.firebaseio.com",
  projectId: "beejbhandar-c3990",
  storageBucket: "beejbhandar-c3990.appspot.com",
  messagingSenderId: "494734080778",
  appId: "1:494734080778:web:e45d90815a4cd9461f58f3",
  measurementId: "G-V77PW9X5B5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database =firebase.database();
export default database;