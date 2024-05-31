// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: "react-chat-app-764b2.firebaseapp.com",
//   projectId: "react-chat-app-764b2",
//   storageBucket: "react-chat-app-764b2.appspot.com",
//   messagingSenderId: "497472938628",
//   appId: "1:497472938628:web:d8f455ced07e63a46e98d1",
//   measurementId: "G-WD2DEN9NR8"
// };



// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
