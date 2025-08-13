import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBltmrwVC5H6NVVYsusdRSB8V-8lFsny8M",
  authDomain: "anemoscan.firebaseapp.com",
  projectId: "anemoscan",
  storageBucket: "anemoscan.firebasestorage.app",
  messagingSenderId: "493525342343",
  appId: "1:493525342343:web:e26c26d8626e6b28070022",
  measurementId: "G-JK9BPVSSS1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);