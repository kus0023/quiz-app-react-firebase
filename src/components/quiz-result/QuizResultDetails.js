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
  return (
    <div className="contianer section project-details">
      <Link to="/">Back</Link>
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title white-text purple">
            {description.topic}
          </span>
          <div className="card-action grey lighten-4 grey-text">
            <div>{moment(description.createdAt.toDate()).calendar()}</div>
          </div>
          {questions &&
            questions.map((q, i) => {
              var cardColor =
                q.user === q.correct_answer
                  ? "green lighten-5"
                  : "purple lighten-5";
              return (
                <div
                  key={i}
                  className={`card z-index-1 col s-12 m-10 ${cardColor}`}
                >
                  {q.user === q.correct_answer ? (
                    <span className="material-icons">done_outline</span>
                  ) : (
                    <span className="material-icons">close</span>
                  )}
                  <p
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: `${i + 1}. ${q.question}`,
                    }}
                  ></p>

                  {q.answers.map((a, i) => {
                    var color = "";
                    if (q.correct_answer === a) {
                      color = "teal lighten-2";
                    } else if (q.user === a) {
                      color = "red lighten-2";
                    }
                    return (
                      <div key={i}>
                        <p
                          className={color}
                          dangerouslySetInnerHTML={{ __html: `${a}` }}
                        ></p>
                      </div>
                    );
                  })}
                </div>
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
