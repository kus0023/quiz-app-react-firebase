import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

/*
Change this file name to firebaseConfig.js

And also, change below firebaseConfig variable to new one created from firebase.
*/

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
