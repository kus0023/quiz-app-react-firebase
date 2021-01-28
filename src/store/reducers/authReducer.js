import {
  LOADING,
  LOADING_FINISHED,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "../types/authType";

const initState = {
  authError: null,
  isLoading: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOADING_FINISHED:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_ERROR:
      console.log("login error", action.err);
      return {
        ...state,
        authError: action.err,
      };

    case LOGIN_SUCCESS:
      console.log("login success");
      return {
        ...state,
        authError: null,
      };

    case SIGNOUT_SUCCESS:
      console.log("signout success");
      return state;

    case SIGNUP_SUCCESS:
      console.log("signup success");
      return {
        ...state,
        authError: null,
      };

    case SIGNUP_ERROR:
      console.log("signup error", action.err.message);
      return {
        ...state,
        authError: action.err,
      };

    default:
      return state;
  }
};

export default authReducer;
