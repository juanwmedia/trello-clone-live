import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: "trello-clone-c1058.firebaseapp.com",
  projectId: "trello-clone-c1058",
  storageBucket: "trello-clone-c1058.appspot.com",
  messagingSenderId: "62298867502",
  appId: "1:62298867502:web:2f34efe8593ab946c0dcbf"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, firebase };
