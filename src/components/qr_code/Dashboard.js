import React, { Component, Fragment } from "react";
import QRCodes from "./qr_codes";
import Form from "./form";
import { Modal } from "react-bootstrap";

export class Dashboard extends Component {
  state = {
    addQrCodeForm: false,
  };
  onOpenForm = () => this.setState({ addQrCodeForm: true });
  handleClose = () => this.setState({ addQrCodeForm: false });
  render() {
    const { addQrCodeForm } = this.state;
    return (
      <Fragment>
        <QRCodes openForm={this.onOpenForm} />
        <Modal show={addQrCodeForm} onHide={this.handleClose}>
          <Form closeForm={this.handleClose} />
        </Modal>
      </Fragment>
    );
  }
}

export default Dashboard;
