// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernrealestate-4e5c6.firebaseapp.com",
  projectId: "mernrealestate-4e5c6",
  storageBucket: "mernrealestate-4e5c6.appspot.com",
  messagingSenderId: "782801669286",
  appId: "1:782801669286:web:75167a998ad31648297867",
  measurementId: "G-3DF4QHWG81",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
