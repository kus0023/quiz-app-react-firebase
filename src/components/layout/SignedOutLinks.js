import React from "react";
import { NavLink } from "react-router-dom";

function SignedOutLinks(props) {
  return (
    <>
      {props.inSidebar && (
        <li>
          <div className="user-view" style={{ height: "150px" }}>
            <div className="background">
              <img src="https://materializecss.com/images/office.jpg" />
            </div>
          </div>
        </li>
      )}
      <li>
        <NavLink
          to="/signup"
          className={props.inSidebar ? "sidenav-close" : ""}
        >
          {props.inSidebar && <i className="material-icons">face</i>}SignUp
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/signin"
          className={props.inSidebar ? "sidenav-close" : ""}
        >
          {props.inSidebar && <i className="material-icons">login</i>}Login
        </NavLink>
      </li>
    </>
  );
}

export default SignedOutLinks;
