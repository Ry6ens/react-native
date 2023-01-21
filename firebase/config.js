import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBamwo11P-Owx0HyCgJ5HkH_MvxvjtIE1U",
  authDomain: "react-native-task-13860.firebaseapp.com",
  projectId: "react-native-task-13860",
  storageBucket: "react-native-task-13860.appspot.com",
  messagingSenderId: "821628427361",
  appId: "1:821628427361:web:0e6db5088d2c209043de20",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default auth;
