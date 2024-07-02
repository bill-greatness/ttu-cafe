// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA-WBy7v2id7XcBE0MVDO53Ql0VfO0cfDQ",
  authDomain: "ttucafe-49349.firebaseapp.com",
  projectId: "ttucafe-49349",
  storageBucket: "ttucafe-49349.appspot.com",
  messagingSenderId: "163128393661",
  appId: "1:163128393661:web:fcb554486ade61414edcd4",
  measurementId: "G-PKFEF7W9J3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)