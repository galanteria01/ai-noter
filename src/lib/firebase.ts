// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-noter.firebaseapp.com",
  projectId: "ai-noter",
  storageBucket: "ai-noter.appspot.com",
  messagingSenderId: "295824909580",
  appId: "1:295824909580:web:1301270b12e127e3695529",
  measurementId: "G-0QP34RTRNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)