import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import { registerUser } from "../../actions/auth";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  };
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    const user = { username, email, password };
    this.props.registerUser(user);
    this.setState({
      username: "",
      email: "",
      password: "",
      password_confirm: "",
    });
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }
    const { username, email, password, password_confirm } = this.state;
    return (
      <div
        style={{ margin: "20px", padding: "20px" }}
        className="col-md-6 m-auto"
      >
        <div className="card card-body mt5">
          <h2 className="text-center"> Register </h2>
          <form onSubmit={this.onSubmit}>
            <div className="mb-3">
              <label for="exampleInputUsername" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername"
                aria-describedby="usernameHelp"
                value={username}
                name="username"
                onChange={this.onChange}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={email}
                onChange={this.onChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                name="password"
                onChange={this.onChange}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Repeat Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password_confirm}
                name="password_confirm"
                onChange={this.onChange}
              />
              {password !== password_confirm ? (
                <div id="emailHelp" className="form-text">
                  Passwords does not Match
                </div>
              ) : (
                ""
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});
export default connect(mapStateToProps, { registerUser })(Register);
