// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF_wWPHi-LDkfZmqeKVtnRnkJdU2SV_fs",
  authDomain: "otp-project-c5964.firebaseapp.com",
  projectId: "otp-project-c5964",
  storageBucket: "otp-project-c5964.firebasestorage.app",
  messagingSenderId: "370337440146",
  appId: "1:370337440146:web:7b94a7bbc18a623f35614b",
  measurementId: "G-4FK0HTEG4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

// export { auth };