import { initializeApp } from 'firebase/app'; // To initialize Firebase
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';  // Firestore
import { getStorage } from 'firebase/storage'; // Storage


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3B2u95gbVAauCF0Pf_vMExk1EQWzbknc",
  authDomain: "realtimechatapp-873f5.firebaseapp.com",
  projectId: "realtimechatapp-873f5",
  storageBucket: "realtimechatapp-873f5.firebasestorage.app",
  messagingSenderId: "342374446639",
  appId: "1:342374446639:web:ee6d5412b1b709d18578da",
  measurementId: "G-JNC5WM15VP"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);  // Firestore initialization

setPersistence(auth, browserLocalPersistence) 
// Google sign-in function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // Return user info after successful sign-in
  } catch (error) {
    throw error;
  }
};

// Exporting the services and functions
export { auth, signInWithGoogle, firestore, getStorage };