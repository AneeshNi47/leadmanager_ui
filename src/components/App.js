import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import { Dashboard as LeadsDashboard } from "./leads/Dashboard";
import { Dashboard as QRCodesDashboard } from "./qr_code/Dashboard";
import Dashboard from "./Dashboard";
import Register from "./accounts/register";
import PrivateRoute from "./common/PrivateRoute";
import Login from "./accounts/login";
import { Provider } from "react-redux";
import { loadUser } from "../actions/auth";
import store from "../store";
import { Container } from "react-bootstrap";

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
            <Container>
              <Routes>
                <Route
                  path="/"
                  element={<PrivateRoute element={Dashboard} />}
                />
                <Route
                  path="/qr-codes"
                  element={<PrivateRoute element={QRCodesDashboard} />}
                />
                <Route
                  path="/leads"
                  element={<PrivateRoute element={LeadsDashboard} />}
                />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </Container>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
