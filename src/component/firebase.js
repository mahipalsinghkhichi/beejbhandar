import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa84F40OKB8M8uvlMOFx_amePNDWSk-_A",
  authDomain: "beejbhandarproject.firebaseapp.com",
  projectId: "beejbhandarproject",
  storageBucket: "beejbhandarproject.appspot.com",
  messagingSenderId: "649216821717",
  appId: "1:649216821717:web:d3582bcd50a036ab39d55c",
  measurementId: "G-T537T3TZK6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database =firebase.database();
export default database;