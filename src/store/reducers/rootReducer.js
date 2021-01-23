import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";
import paperReducer from "./paperReducer";
import quizResultReducer from "./quizResultReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  results: quizResultReducer,
  paper: paperReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
