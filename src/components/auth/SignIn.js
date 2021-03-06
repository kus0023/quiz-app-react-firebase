import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn } from "../../store/actions/authActions";
import CirculerColoredLoader from "../loader/CirculerColoredLoader";

export class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    const { authError, auth, isLoading } = this.props;

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
        <div className="row">
          <form
            onSubmit={this.handleSubmit}
            className="white col s12 m6 offset-m3"
          >
            <h5 className="grey-text text-darken-3">Log In</h5>

            <div className="red-text center">
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
              <button className="btn pink lighten-1 z-depth-0">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (cred) => dispatch(signIn(cred)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
