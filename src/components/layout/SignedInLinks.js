import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";

function SignedInLinks(props) {
  return (
    <ul className="right ">
      <li>
        <NavLink to="/create">Start Quiz</NavLink>
      </li>
      <li>
        <button
          className="waves-effect waves-teal btn-flat white-text"
          onClick={props.signOut}
        >
          Logout
        </button>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          {props.firebase.profile.initials}
        </NavLink>
      </li>
    </ul>
  );
}

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);
