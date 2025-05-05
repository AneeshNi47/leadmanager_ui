import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";

import { NavDropdown, Navbar, Container } from "react-bootstrap";

export class Header extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link style={{ color: "white" }} className="nav-link" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link style={{ color: "white" }} className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <Link style={{ color: "white" }} className="nav-link" to="/qr-codes">
          QR Codes
        </Link>
        <Link style={{ color: "white" }} className="nav-link" to="/leads">
          Leads
        </Link>
        <NavDropdown
          style={{ color: "white", backgroundColor: "#333" }} // added backgroundColor here
          title={
            <span style={{ color: "white" }}>{user ? user.username : ""}</span>
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item
            style={{ color: "white", backgroundColor: "#333" }}
            href="#action/3.1"
          >
            Profile
          </NavDropdown.Item>

          {user && user.is_superuser && (
            <Link
              style={{ color: "white" }}
              className="nav-link"
              to="/groups"
              href="#action/3.3"
            >
              Groups
            </Link>
          )}

          <NavDropdown.Divider />
          <NavDropdown.Item
            style={{ color: "white", backgroundColor: "#333" }}
            onClick={this.props.logoutUser}
          >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </ul>
    );
    return (
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand style={{ color: "white" }}>LeadManager</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {!isAuthenticated ? guestLinks : authLinks}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logoutUser })(Header);
