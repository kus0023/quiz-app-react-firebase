import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { submitPaper } from "../../store/actions/paperActions";
import CirculerColoredLoader from "../loader/CirculerColoredLoader";
import PaperInformation from "./PaperInformation";
import QuestionList from "./QuestionList";

class Paper extends Component {
  state = {
    user: [],
  };

  componentDidMount() {}

  onChange = (value, questionindex) => {
    // console.log(value, questionindex);
    // const { value, questionindex } = e.target;
    const obj = [...this.state.user];
    obj[questionindex] = value;
    this.setState({
      user: obj,
    });
  };

  onSubmitExam = () => {
    // console.log(this.props.paper.formattedQuestions);
    const questions = this.props.paper.formattedQuestions.map((q, i) => {
      q.user = this.state.user[i] || null;
      q.correct_answer = this.props.paper.questions[i].correct_answer;
      return q;
    });
    const description = this.props.paper.description;

    let score = 0;

    questions.forEach((q, i) => {
      const correctAns = this.props.paper.questions[i].correct_answer;
      // console.log(correctAns, q.user);
      score += q.user === correctAns ? 2 : 0;
    });

    description.score = {
      obtain: score,
      max: Number.parseInt(description.amount) * 2,
    };

    const paper = {
      questions,
      description,
    };

    this.props.submitPaper(paper);

    this.props.history.push("/");
  };

  render() {
    const { auth, paper } = this.props;

    if (!auth.uid) return <Redirect to="signin" />;
    // console.log(this.props.paper.questions);

    if (paper.isLoading) {
      return (
        <div class="container center ">
          <div class="row ">
            <div class="col s12 m12 l12" style={{ marginTop: "200px" }}>
              <CirculerColoredLoader />
            </div>
          </div>
        </div>
      );
    }

    if (!paper.examStarted) {
      return <Redirect to="/create" />;
    }

    return (
      <>
        <div className="container">
          <PaperInformation />
          <div className="row">
            <div className="col s12">
              <QuestionList
                list={this.props.paper.formattedQuestions}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="row mb4 center">
            <button
              className=" red white-text darken-1 waves-effect waves-red btn-flat"
              onClick={this.onSubmitExam}
            >
              Submit
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    paper: state.paper,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitPaper: (paper) => dispatch(submitPaper(paper)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paper);
///this will get paper from api and after sumbiting update the database.
