import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getPaper } from "../../store/actions/paperActions";

class CreateQuiz extends Component {
  state = {
    amount: 10,
    category: "9",
    type: "multiple",
    difficulty: "easy",
    topic: "General Knowledge",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });

    if (e.target.id === "category") {
      const index = category.findIndex((i) => i.id + "" === e.target.value);
      this.setState({
        topic: category[index].name,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.getPaper(this.state);
    this.props.history.push("/paper");
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h3 className="grey-text text-darken-3">Exam Board</h3>
          <br />
          <br />

          <label htmlFor="category">Category</label>
          <select
            className="browser-default"
            id="category"
            value={this.state.category}
            onChange={this.handleChange}
          >
            {category.map((opt) => {
              return (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              );
            })}
          </select>

          <label htmlFor="difficulty">difficulty</label>
          <select
            className="browser-default"
            id="difficulty"
            value={this.state.difficulty}
            onChange={this.handleChange}
          >
            <option value={"easy"}>Easy</option>
            <option value={"medium"}>Medium</option>
            <option value={"hard"}>Hard</option>
          </select>

          <label htmlFor="type">Type</label>
          <select
            className="browser-default"
            id="type"
            value={this.state.type}
            onChange={this.handleChange}
          >
            <option value={"multiple"}>Multiple</option>
            <option value={"boolean"}>True/False</option>
          </select>

          <div className="input-field">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              max={30}
              min={10}
              id="amount"
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div className="input-field">
            <button class=" btn-large cyan pulse">
              <i class="material-icons">edit CREATE QUIZ</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapdispatchToProps = (dispatch) => {
  return {
    getPaper: (configs) => dispatch(getPaper(configs)),
  };
};

export default connect(mapStateToProps, mapdispatchToProps)(CreateQuiz);

const category = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 13, name: "Entertainment: Musicals & Theatres" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];
