import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyALywGwV1a6JEgr36kCrBEjESkAk5RQT5Q",
    authDomain: "hackathon-82ce1.firebaseapp.com",
    projectId: "hackathon-82ce1",
    storageBucket: "hackathon-82ce1.firebasestorage.app",
    messagingSenderId: "82890539580",
    appId: "1:82890539580:web:2301d0d9bc07c979c27939",
    measurementId: "G-QN4Y9RLQVF"};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };