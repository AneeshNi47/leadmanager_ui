import React, { Component, Fragment } from "react";
import Leads from "./leads";
import Form from "./form";
import { Modal } from "react-bootstrap";

export class Dashboard extends Component {
  state = {
    addLeadForm: false,
    edit_lead_data: null,
  };
  onOpenForm = (data) =>
    this.setState({ addLeadForm: true, edit_lead_data: data });
  handleClose = () => this.setState({ addLeadForm: false });
  render() {
    const { addLeadForm, edit_lead_data } = this.state;
    return (
      <Fragment>
        <Leads openForm={this.onOpenForm} />
        <Modal show={addLeadForm} onHide={this.handleClose}>
          <Form closeForm={this.handleClose} data={edit_lead_data} />
        </Modal>
      </Fragment>
    );
  }
}

export default Dashboard;
