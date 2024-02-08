// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqV7npG6-x0rx2-8kZez_ytlrYsV63iCs",
  authDomain: "logoali-b387e.firebaseapp.com",
  projectId: "logoali-b387e",
  storageBucket: "logoali-b387e.appspot.com",
  messagingSenderId: "604382275378",
  appId: "1:604382275378:web:33534497beb830caed992b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
