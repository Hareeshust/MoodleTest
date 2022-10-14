import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseconfig";
import { questionSlice } from "./questionsSlice";
const { actions } = questionSlice;
export const setQuestion =(selectedStream:any)=>async(dispatch:any)=>{
    const table="Questions"
      const docSnap = await getDoc(doc(db, table, selectedStream))
      if (docSnap.exists()) {
        const data = docSnap.data();
        dispatch(actions.setQuestionData(data))
      }
    
}