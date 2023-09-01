import React, { Component, Fragment } from "react";
import Leads from "./leads";
import Form from "./form";

export class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Leads />
        <Form />
      </Fragment>
    );
  }
}

export default Dashboard;
