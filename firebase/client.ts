import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDg32xLcsaUWCErPJ2wCqGfUYIpyCNo-0",
  authDomain: "prepwise-8192d.firebaseapp.com",
  projectId: "prepwise-8192d",
  storageBucket: "prepwise-8192d.firebasestorage.app",
  messagingSenderId: "1043223063572",
  appId: "1:1043223063572:web:c7769489f2c54910f68b01",
  measurementId: "G-VP9M97G2NK"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);