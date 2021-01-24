import React from "react";
import { Link } from "react-router-dom";
import QuizResultSummary from "./QuizResultSummary";

function QuizResultList({ quizes }) {
  if (quizes && quizes.length === 0) {
    return <div className="center">There are no content to show</div>;
  }
  return (
    <div className="quiz-list section">
      {quizes &&
        quizes.map((quiz) => {
          return (
            <Link key={quiz.id} to={`paper/${quiz.id}`}>
              <QuizResultSummary desc={quiz.description} />
            </Link>
          );
        })}

      {/* {quizes && <QuizResultSummary desc={quizes[0].description} />} */}
    </div>
  );
}

export default QuizResultList;
