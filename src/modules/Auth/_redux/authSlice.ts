import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
  users: null,
  user:null,
  isLoggedIn: false,
  loginFailure: false
};



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    startCall: (state)=>{
      state.isLoggedIn = false;
      state.loginFailure =false;
    },
    getUserList: (state, action) => {
      state.users = action.payload?.results;
      localStorage.setItem('userList', JSON.stringify(action.payload?.results));
    },
    updateUser: (state, action)=>{
      state.user=action.payload.email;
      state.isLoggedIn = true;
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
