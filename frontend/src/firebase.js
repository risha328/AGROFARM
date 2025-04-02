// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQZ_Xxj6Yc5K71SvAiaLVdYzG7VYb6uik",
  authDomain: "agrofarm-57711.firebaseapp.com",
  projectId: "agrofarm-57711",
  storageBucket: "agrofarm-57711.firebasestorage.app",
  messagingSenderId: "426818835492",
  appId: "1:426818835492:web:ae3988f394e1f94a9c74b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app