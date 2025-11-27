// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function setup_Auth_Emulator(auth) {
  const url = "http://localhost:9099";
  await fetch(url);
  connectAuthEmulator(auth, url);
}

const app_initialized = () => {
  if (getApps().length > 0) {
    const app = getApp();
    if (process.env.NODE_ENV === "development") {
      setup_Auth_Emulator(getAuth(app));
      connectFirestoreEmulator(getFirestore(app), "localhost", 8080);
      connectStorageEmulator(getStorage(app), "localhost", 9199);
    }
  } else {
    const app = initializeApp(firebaseConfig);

    if (process.env.NODE_ENV === "development") {
      setup_Auth_Emulator(getAuth(app));
      connectFirestoreEmulator(getFirestore(app), "localhost", 8080);
      connectStorageEmulator(getStorage(app), "localhost", 9199);
    }
  }
};

//Initialize Firebase
export const app = app_initialized();

//authentication;
export const auth = getAuth(app);

//Database
export const db = getFirestore(app);

//storage
export const storage = getStorage(app);
