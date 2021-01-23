import React, { Component } from "react";
import QuizResultList from "../quiz-result/QuizResultList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

// var userId = useStore;

class Dashboard extends Component {
  render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m10">
            <QuizResultList quizes={this.props.quizes} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizes: state.firestore.ordered.papers,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props, state) => [
    { collection: "papers", where: ["userId", "==", `${props.auth.uid}`] },
  ])
)(Dashboard);
