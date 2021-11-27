import React from "react";
import dog from "../imgs/dog.png";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img src={dog} height={50} width={50} alt=""/>
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                add dog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vocalization">
                vocalizations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/feed">
                Feed
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/highlights">
                Highlights
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/track">
                Track
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
