import * as requestFromServer from "./authCrud";
import { authSlice } from "./authSlice";
import {user} from "../../../data/user";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {auth} from '../../../firebaseconfig'
const { actions } = authSlice;

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

  export const logout = () =>async (dispatch:any) => {
    await signOut(auth);
    dispatch(actions.updateLogout(false));
  };
  
