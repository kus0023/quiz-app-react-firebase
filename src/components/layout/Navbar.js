import React, { Component } from "react";
// import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

class Navbar extends Component {
  // componentDidMount() {
  //   console.log(M);

  //   document.addEventListener("DOMContentLoaded", function () {
  //     var elems = document.querySelectorAll(".sidenav");
  //     const instance = M.Sidenav.init(elems, {
  //       edge: "left",
  //       inDuration: 250,
  //     });
  //     instance.open();
  //   });
  // }

  render() {
    const { auth } = this.props;
    const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
    return (
      <>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo left">
              Quiz
            </Link>
            {/* <Link to="#" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link> */}
            <ul id="nav-mobile" className="right  ">
              {links}
            </ul>
          </div>
        </nav>

        {/* <ul className="sidenav" id="slide-out">
          {links}
        </ul> */}
      </>
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
