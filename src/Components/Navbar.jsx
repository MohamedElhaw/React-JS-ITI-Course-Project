import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"

function Navbar (props){
    return(
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" exact to="/">Menu</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Cart">Cart</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Admin">Admin</NavLink>
        </li>
      </ul>
      <span className="navbar-text">
        <i className="fas fa-cart-arrow-down cart-items-qty"><span>{props.itemsQty}</span></i>
      </span>
    </div>
  </div>
</nav>
    );
}
export default Navbar;