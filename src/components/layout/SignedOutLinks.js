import React from "react";
import { NavLink } from "react-router-dom";

function SignedOutLinks() {
  return (
    <>
      <li>
        <NavLink to="/signup">SignUp</NavLink>
      </li>
      <li>
        <NavLink to="/signin">Login</NavLink>
      </li>
    </>
  );
}

export default SignedOutLinks;
