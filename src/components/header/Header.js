import React, { Fragment, useContext } from "react";
import "./Header.scss";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from "../utils/firebase.utils";
import { UserContext } from "../context/User.context";
import { FcAssistant } from "react-icons/fc";

function Header() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
  };
  return (
    <Fragment>
      <div className="navigation">
        <div>
          <Link className="logo-container nav-link" to="/">
            <FcAssistant />
          </Link>
        </div>
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
