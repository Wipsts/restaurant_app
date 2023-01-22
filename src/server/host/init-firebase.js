import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1Lp1-AfPFJT2cvTUBFS0M77xh7J7Veog",
  authDomain: "restarantproject.firebaseapp.com",
  projectId: "restarantproject",
  storageBucket: "restarantproject.appspot.com",
  messagingSenderId: "546750142670",
  appId: "1:546750142670:web:10a330fe2e7d60fd3f589f",
  measurementId: "G-ZTHMGRY2BP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
export {analytics, db}
