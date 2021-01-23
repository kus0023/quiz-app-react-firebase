import React from "react";
import moment from "moment";

function QuizResultSummary({ desc }) {
  const percentage = (desc.score.obtain / desc.score.max) * 100;
  var color = percentage >= 50 ? "blue accent-5" : "orange accent-1";

  return (
    <div className={`card z-depth-1 desc-summary ${color}`}>
      <div className="card-content black-text text-darken-5">
        <span className="card-title">{desc.topic}</span>
        <p>{`Score: ${desc.score.obtain}/${desc.score.max}`}</p>
        <p>{`Difficulty: ${desc.difficulty}`}</p>
        <p>{moment(desc.createdAt.toDate()).calendar()}</p>
      </div>
    </div>
  );
}

export default QuizResultSummary;
