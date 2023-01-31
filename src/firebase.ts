import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "realminheart.firebaseapp.com",
  projectId: "realminheart",
  storageBucket: "realminheart.appspot.com",
  messagingSenderId: "430775203342",
  appId: "1:430775203342:web:891686f78cba644aa96e5f",
  measurementId: "G-GBXLNGR35M",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
