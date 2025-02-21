// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPlw6CFTnHzwf5gMdpO5vk00c92PBFjAQ",
  authDomain: "gametime-rehab.firebaseapp.com",
  projectId: "gametime-rehab",
  storageBucket: "gametime-rehab.firebasestorage.app",
  messagingSenderId: "153995141647",
  appId: "1:153995141647:web:c3bc642acd5ac2adca797a",
  measurementId: "G-JM1TPLXGD4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firebase Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
