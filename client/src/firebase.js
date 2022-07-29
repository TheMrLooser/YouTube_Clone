import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCwyqcf3DHlc3ggxcMxzXVxyFrNNU2lBoU",
  authDomain: "video-78129.firebaseapp.com",
  projectId: "video-78129",
  storageBucket: "video-78129.appspot.com",
  messagingSenderId: "277189547265",
  appId: "1:277189547265:web:28d9674f45d0fdd7a17700"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider()
export const auth = getAuth()
export default app;