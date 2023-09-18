import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addQrCode, getQrCodeTypes } from "../../actions/qr_codes";
import { Form, Modal, Button } from "react-bootstrap";
import {
  WifiConnectForm,
  StringForm,
  LocationForm,
  VCardForm,
  MCardForm,
  EPCForm,
  information_maker,
} from "./form_types";

export class LeadForm extends Component {
  state = {
    name: "",
    type: "1",
    information: {},
    scale: 4,
    unit: "mm",
    border: "1",
    dark: "darkred",
    light: null,
    data_dark: "darkorange",
    data_light: "yellow",
  };

  static propTypes = {
    addQrCode: PropTypes.func.isRequired,
    getQrCodeTypes: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getQrCodeTypes();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      type,
      scale,
      unit,
      border,
      dark,
      light,
      data_dark,
      data_light,
    } = this.state;
    const qr_code = {
      name,
      qr_type: parseInt(type),
      information: information_maker(this.state, type),
      scale,
      unit,
      border,
      dark,
      light,
      data_dark,
      data_light,
    };
    this.props.addQrCode(qr_code);
    this.setState({
      name: "",
      email: "",
      type: "string",
      information: "",
      scale: "",
      unit: "",
      border: "",
      dark: "",
      light: "",
      data_dark: "",
      data_light: "",
    });
    this.props.closeForm();
  };

  render() {
    const {
      name,
      type,
      information,
      scale,
      unit,
      border,
      dark,
      light,
      data_dark,
      data_light,
    } = this.state;
    return (
      <>
        <Modal.Header>{name === "" ? "Create New QR Code" : name}</Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onSubmit}>
            {/* Existing Fields */}
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={this.onChange}
              />
            </Form.Group>

            {/* Dropdown to Select QR Type */}
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Select
                type="number"
                name="type"
                value={type}
                onChange={this.onChange}
              >
                {this.props.qr_code_types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {type === "1" && <StringForm onChange={this.onChange} />}
            {type === "2" && <WifiConnectForm onChange={this.onChange} />}
            {type === "3" && <MCardForm onChange={this.onChange} />}
            {type === "4" && <VCardForm onChange={this.onChange} />}
            {type === "5" && <LocationForm onChange={this.onChange} />}
            {type === "6" && <EPCForm onChange={this.onChange} />}
            <Button className="submit" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  qr_code_types: state.qrCodeReducer.qr_code_types,
});

export default connect(mapStateToProps, { addQrCode, getQrCodeTypes })(
  LeadForm
);
