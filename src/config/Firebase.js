// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGPKtRucsrKfY5SivnuRdRm32C0AveanI",
  authDomain: "contact-us-76509.firebaseapp.com",
  projectId: "contact-us-76509",
  storageBucket: "contact-us-76509.appspot.com",
  messagingSenderId: "469534413329",
  appId: "1:469534413329:web:06fb527d214a16c9b1d7b0",
  measurementId: "G-CF55VKK97Y",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
