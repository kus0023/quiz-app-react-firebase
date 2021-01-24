import axios from "axios";
import {
  CLOSE_PAPER,
  CREATE_PAPER,
  CREATE_PAPER_ERROR,
  SUBMIT_ERROR,
} from "../types/paperTypes";

export const getPaper = (configs) => {
  return (dispatch, getState) => {
    //fetch data from api using configs
    const { amount, category, difficulty, type } = configs;
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}&difficulty=${difficulty}`;

    axios
      .get(url)
      .then((res) => {
        if (res.data.results.length === 0) {
          throw Error("No Data Found");
        }
        const data = res.data.results.map((q) => {
          const { question, incorrect_answers, correct_answer } = q;
          return {
            question,
            incorrect_answers,
            correct_answer,
          };
        });

        //create formatted data
        const list = data.map((e) => {
          const obj = { question: e.question };
          let ans = [...e.incorrect_answers, e.correct_answer];
          ans.sort(function (a, b) {
            return 0.5 - Math.random();
          });
          obj.answers = ans;
          return obj;
        });

        const payload = {
          data,
          formattedData: list,
          description: configs,
        };
        dispatch({ type: CREATE_PAPER, payload });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: CREATE_PAPER_ERROR, err });
      });
  };
};
export const submitPaper = (paper) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  firestore
    .collection("papers")
    .add({
      ...paper,
      userId,
      description: {
        ...paper.description,
        createdAt: new Date(),
      },
    })
    .then((doc) => {
      // console.log(doc);
      dispatch(closePaper());
    })
    .catch((err) => {
      dispatch({ type: SUBMIT_ERROR, error: err });
    });
};
export const closePaper = () => (dispatch, getState) => {
  dispatch({ type: CLOSE_PAPER });
};
