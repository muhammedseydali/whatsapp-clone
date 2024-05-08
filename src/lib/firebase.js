// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEu4abFY-uHD4KpE13T65Hw8GLJECItzw",
  authDomain: "react-chat-app-764b2.firebaseapp.com",
  projectId: "react-chat-app-764b2",
  storageBucket: "react-chat-app-764b2.appspot.com",
  messagingSenderId: "497472938628",
  appId: "1:497472938628:web:d8f455ced07e63a46e98d1",
  measurementId: "G-WD2DEN9NR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);