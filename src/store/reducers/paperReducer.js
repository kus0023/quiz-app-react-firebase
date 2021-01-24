import {
  CLOSE_PAPER,
  CREATE_PAPER,
  CREATE_PAPER_ERROR,
  SUBMIT_ERROR,
  SUBMIT_PAPER,
} from "../types/paperTypes";

const init = {
  questions: null,
  formattedQuestions: null,
  description: null,
};

const paperReducer = (state = init, action) => {
  switch (action.type) {
    case CREATE_PAPER:
      // console.log(action.data);
      return {
        ...state,
        questions: action.payload.data,
        formattedQuestions: action.payload.formattedData,
        description: action.payload.description,
      };

    case CREATE_PAPER_ERROR:
      console.log(CREATE_PAPER_ERROR, action.err);
      return {
        ...state,
        questions: null,
        formattedQuestions: null,
        description: null,
      };

    case SUBMIT_PAPER:
      return state;

    case CLOSE_PAPER:
      return {
        ...state,
        questions: null,
        formattedQuestions: null,
        description: null,
      };

    case SUBMIT_ERROR:
      console.log("submit exam error", action.error);
      return state;

    default:
      return state;
  }
};

export default paperReducer;
