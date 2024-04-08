// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-e98c8.firebaseapp.com",
  projectId: "mern-auth-e98c8",
  storageBucket: "mern-auth-e98c8.appspot.com",
  messagingSenderId: "434306912174",
  appId: "1:434306912174:web:b294c25dacd2b0158c023f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);