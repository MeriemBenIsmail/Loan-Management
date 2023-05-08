// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB30tZWo16PuCP3-48UBvV8GnrUxid9q9M",
  authDomain: "loan-management-ce9cc.firebaseapp.com",
  projectId: "loan-management-ce9cc",
  storageBucket: "loan-management-ce9cc.appspot.com",
  messagingSenderId: "15943571482",
  appId: "1:15943571482:web:1c21b12b7ecb911b9959a3",
  measurementId: "G-P31NR6GBZR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
