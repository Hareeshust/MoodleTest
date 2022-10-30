import * as requestFromServer from "./authCrud";
import { authSlice } from "./authSlice";
import {user} from "../../../data/user";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {auth, provider} from '../../../firebaseconfig'

const { actions } = authSlice;

export const initialiseCalls=()=> (dispatch:any)=>{
  dispatch(actions.startCall());
}
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


export const login = (username: any, password: any, dispatch:any) => async() => {  
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      // const user = await createUserWithEmailAndPassword(
      //   auth,
      //   username,
      //   password
      // );
      console.log(user);
      if(user){
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
      dispatch(actions.startCall());
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result);
          const { displayName, email, photoURL } = result?.user;
          localStorage.setItem("name", displayName || "");
          localStorage.setItem("email", email || "");
          localStorage.setItem("pic", photoURL || "");
          if (result?.user && result?.user?.email?.match(/.*@tsys.com$/)?.length === 1 ) {
            dispatch(actions.updateUser(result?.user));
          }
          else {
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

export const logout = () =>async (dispatch:any) => {    
     await signOut(auth);
    dispatch(actions.updateLogout(false));
  };
  
