import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBamwo11P-Owx0HyCgJ5HkH_MvxvjtIE1U",
  authDomain: "react-native-task-13860.firebaseapp.com",
  projectId: "react-native-task-13860",
  storageBucket: "react-native-task-13860.appspot.com",
  messagingSenderId: "821628427361",
  appId: "1:821628427361:web:0e6db5088d2c209043de20",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
