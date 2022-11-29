import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlLvgbTLrOm_m615Zj-Nu5RG-lFxl2628",
  authDomain: "moodle-test-a4df9.firebaseapp.com",
  projectId: "moodle-test-a4df9",
  storageBucket: "moodle-test-a4df9.appspot.com",
  messagingSenderId: "1042177288201",
  appId: "1:1042177288201:web:04557a1dd11ec6d0a130d8",
  measurementId: "G-BMRV3X5QNS",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const name = result.user.displayName;
      const email = result.user.email;
      const pic = result.user.photoURL;
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("pic", pic);
    })
    .catch((error) => {
      console.log(error);
    });
};
