import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA1Sfeo_Gfb5KpvAUYJ757jk36X67LTDEg",
    authDomain: "miniblog-react-da686.firebaseapp.com",
    projectId: "miniblog-react-da686",
    storageBucket: "miniblog-react-da686.appspot.com",
    messagingSenderId: "652555277322",
    appId: "1:652555277322:web:7299087aa6565dd9d7bbf3"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }