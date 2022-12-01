import React, { Fragment, useContext } from "react";
import "./Header.scss";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from "../utils/firebase.utils";
import { UserContext } from "../context/User.context";

function Header() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
  };
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          Home
        </Link>
        <div className="nav-links-container">
          {currentUser ? (
            <>
              <span className="nav-link" onClick={signOutHandler}>
                SIGN OUT
              </span>
              <Link className="nav-link" to="/create-post">
                CREATE POST
              </Link>
            </>
          ) : (
            <Link className="nav-link" to="/sign-in">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Header;
