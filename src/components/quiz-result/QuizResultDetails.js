import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link, Redirect } from "react-router-dom";
import { compose } from "redux";
import moment from "moment";

function QuizDetails(props) {
  // console.log(props);

  const { auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  // const id = props.match.params.id;

  if (props.paper === null) {
    return <div className="container center">Loading details...</div>;
  }
  const { description, questions } = props.paper;
  // console.log(description, questions);
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m3 l4 flow-text">
          <h4>{description.topic}</h4>
          <p>
            <strong>Difficulty: </strong>
            {description.difficulty}
          </p>
          <p>
            <strong>Date: </strong>
            {moment(description.createdAt.toDate()).format("LLLL")}
          </p>
          <p>
            <strong>Total: </strong>
            {description.amount}
          </p>
          <p>
            <strong>Score: </strong>
            {description.score.obtain}/{description.score.max}
          </p>
        </div>
        <div className="col s12 m6 l8 right">
          {questions &&
            questions.map((q, i) => {
              const isCorrect = q.user === q.correct_answer;
              return (
                <ul className="collection with-header m0" key={i}>
                  <li className="collection-header avatar">
                    {isCorrect ? (
                      <i className="material-icons circle green right">check</i>
                    ) : (
                      <i className="material-icons circle red right">close</i>
                    )}
                    <h5
                      dangerouslySetInnerHTML={{
                        __html: `${i + 1}. ${q.question}`,
                      }}
                    ></h5>
                  </li>
                  {q.answers.map((a, j) => {
                    const green = " active green";
                    const red = " active red";
                    var color = null;
                    if (a === q.user) {
                      color = red;
                    }
                    if (a === q.correct_answer) {
                      color = green;
                    }
                    return (
                      <li key={j} className={"collection-item " + color}>
                        {a}
                      </li>
                    );
                  })}
                </ul>
              );
            })}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const papers = state.firestore.data.papers;
  const paper = papers ? papers[id] : null;
  return {
    paper,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "papers" }])
)(QuizDetails);
