// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // banco de dados
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1Sfeo_Gfb5KpvAUYJ757jk36X67LTDEg",
  authDomain: "miniblog-react-da686.firebaseapp.com",
  projectId: "miniblog-react-da686",
  storageBucket: "miniblog-react-da686.appspot.com",
  messagingSenderId: "652555277322",
  appId: "1:652555277322:web:7299087aa6565dd9d7bbf3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };