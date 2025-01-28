import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMCRjCiyuqrMZSHmszSRkJZnQLDA5jGA0",
  authDomain: "realtime-chat-app-f3345.firebaseapp.com",
  projectId: "realtime-chat-app-f3345",
  storageBucket: "realtime-chat-app-f3345.firebasestorage.app",
  messagingSenderId: "668881267743",
  appId: "1:668881267743:web:c5c238e9b289d65c2e392a",
  measurementId: "G-PLJ8E1QJJV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
