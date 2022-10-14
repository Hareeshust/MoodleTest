import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionData:{}
};


export const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestionData:(state, action)=>{
      state.questionData = action.payload;
    }
  }
});

export default questionSlice.reducer