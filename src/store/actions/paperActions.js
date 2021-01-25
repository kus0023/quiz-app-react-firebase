import axios from "axios";
import {
  CLOSE_PAPER,
  CREATE_PAPER,
  CREATE_PAPER_ERROR,
  LOADING_PAPER,
  SUBMIT_ERROR,
} from "../types/paperTypes";

const getToken = async () => {
  const tokenUrl = "https://opentdb.com/api_token.php?command=request";
  const res = await axios.get(tokenUrl);
  return res.data.token;
};

export const getPaper = (configs) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING_PAPER });
    //fetch data from api using configs
    const { amount, category, difficulty, type } = configs;

    let token = null;
    if (getState().paper.token === null) {
      token = await getToken();
      window.M.toast({
        html: "Token generated Successfully.",
      });
    } else {
      token = getState().paper.token;
      window.M.toast({
        html: "Token already Exist.",
      });
    }
    console.log(getState().paper, token);
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}&difficulty=${difficulty}&token=${token}`;
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
          token,
        };
        dispatch({ type: CREATE_PAPER, payload });
      })
      .catch((err) => {
        console.log(err);
        window.M.toast({
          html: "<h5>Paper Creation Failed.</h5>",
        });
        dispatch({ type: CREATE_PAPER_ERROR, err });
      });
  };
};
export const submitPaper = (paper) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch({ type: LOADING_PAPER });
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
      window.M.toast({
        html: "<p>Submition ERROR</p>",
      });
    });
};
export const closePaper = () => (dispatch, getState) => {
  dispatch({ type: CLOSE_PAPER });
};
