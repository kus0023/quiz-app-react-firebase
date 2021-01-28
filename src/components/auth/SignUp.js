import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/actions/authActions";
import CirculerColoredLoader from "../loader/CirculerColoredLoader";

export class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  render() {
    const { auth, authError, isLoading } = this.props;

    if (auth.uid) return <Redirect to="/" />;
    if (isLoading) {
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
    return (
      <div className="App container">
        <div className="row section">
          <form
            onSubmit={this.handleSubmit}
            className="white col s12 m6 offset-m3"
          >
            <h5 className="grey-text text-darken-3">Register</h5>
            <div className=" red-text center">
              {authError ? <p>{authError.message}</p> : ""}
            </div>

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="firstName">firstName</label>
              <input type="text" id="firstName" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">lastName</label>
              <input type="text" id="lastName" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    isLoading: state.auth.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user) => dispatch(signUp(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
