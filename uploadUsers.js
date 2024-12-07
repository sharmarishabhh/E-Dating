// uploadUsers.js
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const users = require('./users.json');


// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBGvOiZW_F0lebNi7wKxv9Fj9AokyVqevY",
  authDomain: "e-dating-c0632.firebaseapp.com",
  projectId: "e-dating-c0632",
  storageBucket: "e-dating-c0632.appspot.com",
  messagingSenderId: "465298297529",
  appId: "1:465298297529:web:a6ff256fbb22bcf8b58168",
  measurementId: "G-2JLP3WQRBY",
};


// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to upload each user to Firestore
const uploadUsers = async () => {
  try {
    for (const user of users) {
      const userRef = doc(db, 'users', user.uid); // Use UID as document ID
      await setDoc(userRef, user, { merge: true }); // Upload user data
      console.log(`Uploaded ${user.uid}`);
    }
    console.log('All users uploaded successfully!');
  } catch (error) {
    console.error('Error uploading users:', error);
  }
};

// Call the upload function
uploadUsers();
