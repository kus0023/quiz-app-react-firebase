import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";

function SignedInLinks(props) {
  const logOut = () => {
    const options = {
      html: "Logged Out.",
    };
    window.M.toast(options);
    props.signOut();
  };
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
          <div onClick={logOut}>Logout</div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={
            props.inSidebar ? "" : "btn btn-floating pink lighten-1 tooltipped"
          }
          data-position="bottom"
          data-tooltip={`${props.firebase.profile.firstName} ${props.firebase.profile.lastName}`.toUpperCase()}
        >
          {props.inSidebar
            ? `${props.firebase.profile.firstName} ${props.firebase.profile.lastName}`.toUpperCase()
            : props.firebase.profile.initials}
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
