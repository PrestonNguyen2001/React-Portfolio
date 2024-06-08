// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "portfolio-baf72.firebaseapp.com",
  projectId: "portfolio-baf72",
  storageBucket: "portfolio-baf72.appspot.com",
  messagingSenderId: "426015728549",
  appId: "1:426015728549:web:df532b6a4c5d9f0e9fbe4c",
  measurementId: "G-YD0SFNLSLC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
