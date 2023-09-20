import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../actions/auth";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.loginUser(username, password);
    this.setState({
      username: "",
      password: "",
    });
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }
    const { username, password } = this.state;
    return (
      <div
        style={{ margin: "20px", padding: "20px" }}
        className="col-md-6 m-auto"
      >
        <div className="card card-body mt5">
          <h2 className="text-center"> Login </h2>
          <form onSubmit={this.onSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputUsername" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername"
                value={username}
                name="username"
                onChange={this.onChange}
                aria-describedby="usernameHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                name="password"
                onChange={this.onChange}
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});
export default connect(mapStateToProps, { loginUser })(Login);
