import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";

import { NavDropdown, Navbar, Button } from "react-bootstrap";

export class Header extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <NavDropdown title={user ? user.username : ""} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>

          {user ? (
            user.is_superuser ? (
              <NavDropdown.Item href="#action/3.3">Groups</NavDropdown.Item>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          <NavDropdown.Divider />
          <NavDropdown.Item onClick={this.props.logoutUser}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </ul>
    );
    return (
      <Navbar className="bg-body-tertiary">
        <Navbar.Brand href="#">LeadManager</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>{!isAuthenticated ? guestLinks : authLinks}</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logoutUser })(Header);
