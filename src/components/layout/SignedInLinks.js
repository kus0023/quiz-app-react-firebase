import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";

function SignedInLinks(props) {
  return (
    <>
      {/* <li>
        <NavLink to="/">Dashboard</NavLink>
      </li> */}
      <li>
        <NavLink to="/create">Start Quiz</NavLink>
      </li>
      <li>
        <NavLink to="#!">
          <div onClick={props.signOut}>Logout</div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          {props.firebase.profile.initials}
        </NavLink>
      </li>
    </>
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
