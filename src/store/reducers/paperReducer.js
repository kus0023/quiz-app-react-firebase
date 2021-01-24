import {
  CLOSE_PAPER,
  CREATE_PAPER,
  CREATE_PAPER_ERROR,
  SUBMIT_ERROR,
  SUBMIT_PAPER,
  LOADING_PAPER,
} from "../types/paperTypes";

const init = {
  isLoading: false,
  examStarted: false,
  questions: null,
  formattedQuestions: null,
  description: null,
  token: null,
};

const paperReducer = (state = init, action) => {
  switch (action.type) {
    case LOADING_PAPER:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_PAPER:
      // console.log(action.data);
      return {
        ...state,
        questions: action.payload.data,
        formattedQuestions: action.payload.formattedData,
        description: action.payload.description,
        examStarted: true,
        isLoading: false,
        token: action.payload.token,
      };

    case CREATE_PAPER_ERROR:
      console.log(CREATE_PAPER_ERROR, action.err);
      return {
        ...state,
        questions: null,
        formattedQuestions: null,
        description: null,
        isLoading: false,
        examStarted: false,
      };

    case SUBMIT_PAPER:
      return {
        ...state,
        examStarted: false,
        isLoading: false,
      };

    case CLOSE_PAPER:
      return {
        ...state,
        questions: null,
        formattedQuestions: null,
        description: null,
        isLoading: false,
        examStarted: false,
      };

    case SUBMIT_ERROR:
      console.log("submit exam error", action.error);
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default paperReducer;
