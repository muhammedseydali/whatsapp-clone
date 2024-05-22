// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"



const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-app-764b2.firebaseapp.com",
  projectId: "react-chat-app-764b2",
  storageBucket: "react-chat-app-764b2.appspot.com",
  messagingSenderId: "497472938628",
  appId: "1:497472938628:web:d8f455ced07e63a46e98d1",
  measurementId: "G-WD2DEN9NR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
