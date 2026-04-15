// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkb-QXJEYJSV0vqg5fxO9hDLKOnBxBXU8",
  authDomain: "aula-mobile-ebec7.firebaseapp.com",
  projectId: "aula-mobile-ebec7",
  storageBucket: "aula-mobile-ebec7.firebasestorage.app",
  messagingSenderId: "563828844040",
  appId: "1:563828844040:web:f5df903eb57aa22da853bd",
  measurementId: "G-9Q3BD2B142"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);