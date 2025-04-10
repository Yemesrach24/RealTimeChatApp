import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBTP6En43z3PtHczbfGDVRBGaH3KXbltB0",
    authDomain: "messaging-app-db55a.firebaseapp.com",
    projectId: "messaging-app-db55a",
    storageBucket: "messaging-app-db55a.firebasestorage.app",
    messagingSenderId: "358530201434",
    appId: "1:358530201434:web:875bde637267dc2f5a6563",
    measurementId: "G-RWBZYXQK76"
  };

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
