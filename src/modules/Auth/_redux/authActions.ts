import * as requestFromServer from "./authCrud";
import { authSlice } from "./authSlice";
import { user } from "../../../data/user";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../../firebaseconfig";
import { db } from "../../../firebaseconfig";
import {
  collection,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { format } from "date-fns";

const { actions } = authSlice;
const userCollectionRef = collection(db, "users");

export const initialiseCalls = () => (dispatch: any) => {
  dispatch(actions.startCall());
};
export const getAllUsers = () => (dispatch: any) => {
  // return requestFromServer
  //   .fetchAllUsers()
  //   .then(response => {
  //     dispatch(actions.getUserList(response?.data));
  //     return response
  //   })
  //   .catch((error: any) => {
  //     error.clientMessage = "Can't get user details";
  //   });
};

export const login =
  (username: any, password: any, dispatch: any) => async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, username, password);
      // const user = await createUserWithEmailAndPassword(
      //   auth,
      //   username,
      //   password
      // );
      console.log(user);
      if (user) {
        dispatch(actions.updateUser(user?.user));
      }
    } catch (error: any) {
      console.log(error.message);
    }

    // if(user.username === username && user.password === password){
    //     return new Promise((resolve: any) =>
    //     setTimeout(() => resolve({ data: "success" }), 500)
    //   );
    // }
    // else{
    //     return new Promise((resolve: any) =>
    //     setTimeout(() => resolve({ data: "failure" }), 500)
    //   );
    // }
  };
export const googleSignIn = (dispatch: any) => async () => {
  try {
    dispatch(actions.startCall1());
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        if (
          result?.user &&
          result?.user?.email?.match(/.*@tsys.com$/)?.length === 1
        ) {
          const { displayName, email, photoURL } = result?.user;
          localStorage.setItem("name", displayName || "");
          localStorage.setItem("email", email || "");
          localStorage.setItem("pic", photoURL || "");
          updateToken(result?.user, dispatch);
          // dispatch(actions.updateUser(result?.user));
        } else {
          dispatch(actions.updateUserLogginFailure(true));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error: any) {
    console.log(error.message);
  }
};

const updateToken = async (user: any, dispatch: any) => {
  dispatch(actions.startCall());
  const docRef = doc(db, "users", user?.email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    dispatch(actions.updateUserToken(docSnap?.data()));
  } else {
    await setDoc(doc(userCollectionRef, user?.email), {
      token: user?.email,
      starttime: format(new Date(user?.metadata?.lastSignInTime), "MM/dd/yyyy"),
      testCleared: false,
      retakeDate: "",
      testStarted: false,
      testFinished: false,
    });
  }
  //const userAdded = await addDoc(userCollectionRef, {token: user?.email, starttime: user?.metadata?.lastSignInTime})
  dispatch(actions.updateUser(user));
};

export const logout = () => async (dispatch: any) => {
  await signOut(auth);
  dispatch(actions.updateLogout(false));
};
