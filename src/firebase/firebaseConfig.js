import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDUxsqmWC7AfjZeLCSoNZjedaYMUg1-OQ",
  authDomain: "mysplash-ff1ab.firebaseapp.com",
  projectId: "mysplash-ff1ab",
  storageBucket: "mysplash-ff1ab.appspot.com",
  messagingSenderId: "488890544579",
  appId: "1:488890544579:web:f963f7f6ca2e5355a74d76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  Auth
export const auth = getAuth();
// DB
export const db = getFirestore(app);
