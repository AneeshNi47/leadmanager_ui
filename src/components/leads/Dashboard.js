import React, { Component, Fragment } from "react";
import Leads from "./leads";
import Form from "./form";
import { Modal } from "react-bootstrap";

export class Dashboard extends Component {
  state = {
    addLeadForm: false,
  };
  onOpenForm = () => this.setState({ addLeadForm: true });
  handleClose = () => this.setState({ addLeadForm: false });
  render() {
    const { addLeadForm } = this.state;
    return (
      <Fragment>
        <Leads openForm={this.onOpenForm} />
        <Modal show={addLeadForm} onHide={this.handleClose}>
          <Form closeForm={this.handleClose} />
        </Modal>
      </Fragment>
    );
  }
}

export default Dashboard;
