// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import Firebase Auth
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGvOiZW_F0lebNi7wKxv9Fj9AokyVqevY",
  authDomain: "e-dating-c0632.firebaseapp.com",
  projectId: "e-dating-c0632",
  storageBucket: "e-dating-c0632.appspot.com",
  messagingSenderId: "465298297529",
  appId: "1:465298297529:web:a6ff256fbb22bcf8b58168",
  measurementId: "G-2JLP3WQRBY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth for use in Login/SignUp components
export const auth = getAuth(app);

export const db = getFirestore(app); // Export Firestore instance
export const storage = getStorage(app);
