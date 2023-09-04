import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Dashboard from "./leads/Dashboard";
import Register from "./accounts/register";
import PrivateRoute from "./common/PrivateRoute";
import Login from "./accounts/login";
import { Provider } from "react-redux";
import { loadUser } from "../actions/auth";
import store from "../store";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <ToastContainer />
            <Header />
            <Alerts />
            <div className="container">
              <Routes>
                <Route
                  path="/"
                  element={<PrivateRoute element={Dashboard} />}
                />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
