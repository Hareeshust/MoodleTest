import { user } from "../../../data/user";
import * as requestFromServer from "./usersCrud";
import { userSlice } from "./usersSlice";
import {db} from '../../../firebaseconfig';
import {collection, getDocs, addDoc, setDoc, getDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import { format } from 'date-fns'
const { actions } = userSlice;
const userCollectionRef = collection(db,'users');

export const updateUser = (id: any, age:any) => async () =>{
  const userDoc = doc(db,"users", id)
  const newFields = {age:age+1}
  await updateDoc(userDoc, newFields);

}

export const deleteUser = (id: any) => async () =>{
  const userDoc = doc(db,"users", id)
  await deleteDoc(userDoc);

}

export const createUser = (user: any) => async () => {
  await addDoc(userCollectionRef, {name: user.firstname, designation: user.designation})
};

export const getAllUsers =  () => async (dispatch: any) => {
    const data = await getDocs(userCollectionRef)
    dispatch(actions.getUserList(data.docs.map((doc)=>({...doc.data(), id:doc.id}))));
  };
  
  export const searchUser = (key:any) => (dispatch: any) => {
    const response = localStorage.getItem('userList');
    var filteredUser = [];
        if(response){
            filteredUser = JSON.parse(response).filter(function(item: any){
                return item.user?.name?.first?.toLowerCase().indexOf(key) > -1;
               });
        }        
        dispatch(actions.getUserList(filteredUser));
  };

  export const updateTestStatus = (token, retestDate:any, isCleared:any) => async (dispatch: any) => {
    const userDoc = doc(db,"users", token)
    const newFields = {retakeDate:retestDate, testCleared: isCleared}
    await updateDoc(userDoc, newFields);
  };
  export const updateTestStarted = (token, testStarted) => async (dispatch: any) => {
    var days=7;
    var date = new Date();
    var last = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var day =last.getDate();
    var month=last.getMonth()+1;
    var year=last.getFullYear();
    //const retestDate = format(new Date(year, day-1, month), 'MM/dd/yyyy')
   const retestDate = `${day}/${month}/${year}`
    const userDoc = doc(db,"users", token)
    const newFields = {testStarted: testStarted,starttime: format(new Date(), 'MM/dd/yyyy'), retakeDate: retestDate }
    await updateDoc(userDoc, newFields);
  };

export const uploadQuestions = (workstream: any, questions:any) => async (dispatch: any) => {
  const updatedQuestion = formatQuestions(questions);
   const questionRef = collection(db,'testquestions');
  const docRef = doc(db, 'testquestions',workstream);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {questions:updatedQuestion});
  } else {
    await setDoc(doc(questionRef,workstream), {
      questions:updatedQuestion
     });
  }


};

const formatQuestions = (questions) =>{
  let questionArray = [];
  questions.map((question)=>{
    let options =[];
    let option1 = {
      answerText: question.Option1,
      isCorrect: question?.CorrectAnswer?.split(',')?.includes('Option1') ? true: false
    }
    let option2 = {
      answerText: question.Option2,
      isCorrect: question?.CorrectAnswer?.split(',')?.includes('Option2') ? true: false
    }
    let option3 = {
      answerText: question.Option3,
      isCorrect: question?.CorrectAnswer?.split(',')?.includes('Option3') ? true: false
    }
    let option4 = {
      answerText: question.Option4,
      isCorrect: question?.CorrectAnswer?.split(',')?.includes('Option4') ? true: false
    }

    options = [option1,option2,option3,option4]
    let data = {
      questionText: question.questionText,
      type: question.type,
      options: options
    }
    questionArray.push(data)
  })
  return questionArray;
}