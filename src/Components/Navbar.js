import React, { useContext } from "react";
import Breadcrumb from "./Breadcrumb";
import "./Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "./Auth/AuthContext";
import { useHistory } from "react-router-dom";

function Navbar() {
  const history = useHistory()
  const { user, logout } = useContext(AuthContext)

  let directToSignup = () => {
      history.push('/signup')
  }

  let logoutHandler = () => {
    logout();
  }

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-breadcrumb">
          <Breadcrumb />
        </div>
        <div className="navbar-right">
          <div className="navbar-search">
            <input placeholder="Search"></input>
          </div>
          <div className="navbar-icons">
            {user == null ? (
              <div className="navbar-login" onClick={directToSignup}>
                <PersonIcon />
                <p>Sign Up/In</p>
              </div>
            ) : (
              <div className="navbar-logout" onClick={logoutHandler}>
                &nbsp;&nbsp;&nbsp;<LogoutIcon />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
