import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASECONFIG_APIKEY,
  authDomain: process.env.FIREBASECONFIG_AUTH_DOMAIN,
  projectId: process.env.FIREBASECONFIG_PROJECTID,
  storageBucket: process.env.FIREBASECONFIG_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASECONFIG_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASECONFIG_APP_ID,
  measurementId: process.env.FIREBASECONFIG_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);