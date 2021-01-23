import React from "react";
import Question from "./Question";

function QuestionList({ list, onChange }) {
  return (
    <div className=" section">
      {list &&
        list.map((v, i) => (
          <Question key={i} data={v} n={i} onChange={onChange} />
        ))}
    </div>
  );
}

export default QuestionList;
