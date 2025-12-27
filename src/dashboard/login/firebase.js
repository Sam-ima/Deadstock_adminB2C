// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyd2n_NTywR2aXDvqLQdZ3uUKl_iLluzA",
  authDomain: "deadstock-bca95.firebaseapp.com",
  projectId: "deadstock-bca95",
  storageBucket: "deadstock-bca95.firebasestorage.app",
  messagingSenderId: "392812282698",
  appId: "1:392812282698:web:506aa434e1d3c6656a37b3",
  measurementId: "G-V7BWKRBMD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth }; // Export auth, not analytics
export default auth;



