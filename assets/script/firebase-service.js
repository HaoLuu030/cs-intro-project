// a file which handles interactions with Firestore

// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc as getDocument,
  onSnapshot,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
import firebaseConfig from "../config/firebase-config.js";

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// export the db as well as other functions
export { db, collection, addDoc, deleteDoc, onSnapshot, getDocument, getDocs };
