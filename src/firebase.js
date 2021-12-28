import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

import { getDatabase, ref as dbRef,push, set,child ,get } from "firebase/database";

import {
  getStorage,
  ref as storeRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIoLpl765UflABlNqzZg3yX7uY5B8Yjcg",
  authDomain: "projectcovid-988bc.firebaseapp.com",
  projectId: "projectcovid-988bc",
  storageBucket: "projectcovid-988bc.appspot.com",
  messagingSenderId: "955209819769",
  appId: "1:955209819769:web:2995f3cd6f02b7312756a8",
  measurementId: "G-KX0WCB7ZH9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
  users : firestore.collection('users'),
  posts : firestore.collection('posts'),
  comments : firestore.collection('comments'),
  getTimeStamp : firebase.firestore.FieldValue.serverTimestamp,
}

class FirebaseClass {
  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.db = getDatabase();
  }

  getReports = async (Id) => {
    const data = await get(dbRef(this.db,`reports/${Id}/`))
    const tempData = []
    if(!data.val()) return;
    await Object.keys(data.val()).forEach((key)=>{
      tempData.push({
        ...data.val()[key],
        key
      })
    })
    console.log(tempData)
    return tempData;
  }

  storeImage = (file, cb,userId,reportType) => {
    const storage = getStorage();
    const storageRef = storeRef(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log(file)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          cb(null,null,progress)
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await this.saveUserData(userId,downloadURL,file.name,file.name.split('.').pop(),reportType);
          cb(downloadURL, file.name);
        });
      }
    );
  };

  saveUserData = (Id,url,name,format,type) => {
    const newId = push(child(dbRef(this.db),'reports')).key
    set(dbRef(this.db,`reports/${Id}/` + newId),{
      url,
      name,
      result : 'No Diagnosis',
      format,
      type,
    })
  }

  updateResults = async (obj,result,pid) => {
    await set(dbRef(this.db,`reports/${pid}/${obj.key}`), {
      ...obj,
      result :result, 
    })
    return this.getReports(pid)
  }

  predictionNumbers = async (id) => {
    const data = await get(dbRef(this.db,`reports/${id}/`))
    let pC=0;
    let nC=0;
    if(!data.val()) return;
    await Object.keys(data.val()).forEach((key)=>{
      if(data.val()[key].result==='Prediction: Normal') nC++;
      if(data.val()[key].result==='Prediction: Corona') pC++;
    })
    return [pC,nC];
  }
}
export default FirebaseClass;

export const storage = firebase.storage()