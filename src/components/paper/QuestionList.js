import React from "react";
import Question from "./Question";

function QuestionList({ list, onChange }) {
  return (
    <>
      {list &&
        list.map((v, i) => (
          <ul key={i} className="collection with-header">
            <Question data={v} n={i} onChange={onChange} />
          </ul>
        ))}
    </>
  );
}

export default QuestionList;
