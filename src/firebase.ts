import { collection, getDocs, query, where } from "firebase/firestore";

import { documentId } from "firebase/firestore";

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
const db = getFirestore(firebaseApp);

export const getPosts = async () => {
  const q = query(collection(db, "posts"));
  const querySnapShot = await getDocs(q);
  const posts = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    image: doc.data().image[0].downloadURL,
    fulldate: new Date(
      doc.data()._createdBy.timestamp.seconds * 1000
    ).toString(),
    convertedDate:
      new Date(doc.data()._createdBy.timestamp.seconds * 1000).toLocaleString(
        "en-GB",
        { month: "short" }
      ) +
      " " +
      new Date(doc.data()._createdBy.timestamp.seconds * 1000).getDate() +
      "," +
      " " +
      new Date(doc.data()._createdBy.timestamp.seconds * 1000).getFullYear(),
    title: doc.data().title,
    content: doc.data().content,
    cat: doc.data().car,
    tags: doc.data().tags,
    authorUID: doc.data()._createdBy.uid,
  }));
  return posts;
};
