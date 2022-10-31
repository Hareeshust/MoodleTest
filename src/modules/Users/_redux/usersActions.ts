import { user } from "../../../data/user";
import * as requestFromServer from "./usersCrud";
import { userSlice } from "./usersSlice";
import {db} from '../../../firebaseconfig';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';

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
    const userDoc = doc(db,"users", token)
    const newFields = {testStarted: testStarted}
    await updateDoc(userDoc, newFields);
  };
  
  
  const getUserStructure = (user: any)=>{
    let data =  {
      "gender": user.gender,
      "name": {
        "title":  user.title,
        "first": user.firstname,
        "last": user.lastname
      },
      "location": {
        "street": "2989 keistraat",
        "city": "castricum",
        "state": "friesland",
        "zip": 42366
      },
      "email": user.email,
      "username": user.username,
      "password": user.password,
      "salt": "60AYD76x",
      "md5": "7ce5593c3ff3da5a4a87c8384c444809",
      "sha1": "be29c483a39cf7c635d09b800ef2acb196812c6e",
      "sha256": "0dcb04303409c3043fa493c3f1f6f1798fecb61009bd64e373c5ccfe8db00a63",
      "registered": 1110588771,
      "dob": user.dob,
      "phone": user.phone,
      "cell": "(364)-503-5528",
      "BSN": "65048540",
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/74.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/74.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/74.jpg"
      }
    }
    return data;
  }

 