import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
  users: null,
  user:null,
  isLoggedIn: false,
  loginFailure: false,
  userToken:null,
  userLogonTime: null,
  testCleared: false,
  retakeDate:'',
  testStarted:false,
  testFinished: false
};



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    startCall: (state)=>{
      state.loginFailure =false;
      //state.userToken = null;
      //state.testCleared=false;
    },
    startCall1: (state)=>{
      state.loginFailure =false;
      state.isLoggedIn = false;
      state.testCleared=false;
    },
    getUserList: (state, action) => {
      state.users = action.payload?.results;
      localStorage.setItem('userList', JSON.stringify(action.payload?.results));
    },
    updateUser: (state, action)=>{
      state.user=action.payload.email;
      state.isLoggedIn = true;
    },
    updateUserToken: (state, action)=>{
      state.userToken=action.payload.token;
      state.userLogonTime=action.payload.starttime;
      state.testCleared=action.payload.testCleared;
      state.retakeDate=action.payload.retakeDate;
      state.testStarted=action.payload.testStarted;
      state.testFinished=action.payload.testFinished;
    },
    updateUserLogginFailure: (state, action)=>{
      state.isLoggedIn = false;
      state.loginFailure= action.payload;

    },
    updateLogout: (state, action) =>{
      state.isLoggedIn = action.payload;
    }
  }
});

//export const { increment, decrement, incrementByAmount } = authSlice.actions;


export default authSlice.reducer;
