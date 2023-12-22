import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUPC-fUfOQtEEsC74um5ZCfzxVn9rM9lA",
  authDomain: "role-based-user-login.firebaseapp.com",
  projectId: "role-based-user-login",
  storageBucket: "role-based-user-login.appspot.com",
  messagingSenderId: "578062688510",
  appId: "1:578062688510:web:dc51e2da92af008dea05af",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
