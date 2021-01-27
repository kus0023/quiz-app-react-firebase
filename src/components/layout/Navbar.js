import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

class Navbar extends Component {
  componentDidMount() {
    const M = window.M;

    const options = {
      draggable: true,
    };

    var elems = document.querySelectorAll(".sidenav");
    const instance = M.Sidenav.init(elems, options);

    elems = document.querySelectorAll(".tooltipped");
    var instances = M.Tooltip.init(elems, options);
  }

  render() {
    const { auth, profile } = this.props;

    // console.log(profile, auth);
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper deep-orange darken-3">
              <Link
                to="#"
                data-target="slide-out"
                className="sidenav-trigger show-on-large"
              >
                <i className="material-icons">menu</i>
              </Link>
              <Link to="/" className="brand-logo">
                Quiz App
              </Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {auth.uid ? (
                  <SignedInLinks inSidebar={false} />
                ) : (
                  <SignedOutLinks inSidebar={false} />
                )}
              </ul>
            </div>
          </nav>
        </div>

        <ul id="slide-out" className="sidenav">
          {auth.uid && (
            <li>
              <div className="user-view">
                <div className="background">
                  <img src="https://materializecss.com/images/office.jpg" />
                </div>
                <Link to="#">
                  <img
                    className="circle"
                    src="https://materializecss.com/images/yuna.jpg"
                  />
                </Link>

                <Link to="#">
                  <span className="white-text name">
                    {`${profile.firstName} ${profile.lastName}`.toUpperCase()}
                  </span>
                </Link>
                <Link to="#">
                  <span className="white-text email">{auth.email}</span>
                </Link>
              </div>
            </li>
          )}
          <li>
            <Link to="/" className="sidenav-close">
              <i className="material-icons">home</i>Dashboard
            </Link>
          </li>
          {auth.uid ? (
            <SignedInLinks inSidebar={true} />
          ) : (
            <SignedOutLinks inSidebar={true} />
          )}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
export default connect(mapStateToProps)(Navbar);
