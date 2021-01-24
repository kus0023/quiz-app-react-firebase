import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";
import paperReducer from "./paperReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  paper: paperReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
