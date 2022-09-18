import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_ID,
    appId: process.env.REACT_APP_APPID,
    measurementId:process.env.REACT_APP_MESSUREMENT_ID
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app)

  const provider = new GoogleAuthProvider()

  export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result)=>{
      console.log(result);
      const name  =result.user.displayName;
      const email = result.user.email;
      const pic = result.user.photoURL
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("pic", pic);
    }).catch((error)=>{
      console.log(error);
    })
  }