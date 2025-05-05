import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addQrCode, getQrCodeTypes } from "../../actions/qr_codes";
import { Form, Modal, Button, Accordion, Row, Col } from "react-bootstrap";
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
    type: "",
    information: {},
    scale: 4,
    unit: "mm",
    border: "1",
    dark: "#8b0000",
    light: null,
    data_dark: "#ff8e00",
    data_light: "#ffff00",
  };

  static propTypes = {
    addQrCode: PropTypes.func.isRequired,
    getQrCodeTypes: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getQrCodeTypes();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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

    // Validation for missing QR type
    if (!type || type === "") {
      alert("Please select a QR Code type.");
      return;
    }

    // Create information
    const info = information_maker(this.state, type);

    // Validation for missing or empty information
    if (!info || Object.keys(info).length === 0) {
      alert("Please fill out the required information for the selected QR Code type.");
      return;
    }

    const qr_code = {
      name,
      qr_type: parseInt(type),
      information: info,
      scale,
      unit,
      border,
      dark,
      light,
      data_dark,
      data_light,
    };

    console.log("Payload being sent:", qr_code);
    this.props.addQrCode(qr_code);

    // Reset form
    this.setState({
      name: "",
      email: "",
      type: "",
      information: {},
      scale: 4,
      unit: "mm",
      border: "1",
      dark: "#8b0000",
      light: null,
      data_dark: "#ff8e00",
      data_light: "#ffff00",
    });

    this.props.closeForm();
  };

  get_qr_code_form = (type) => {
    const { qr_code_types } = this.props;
    const selectedType = qr_code_types.find(
      (qr_type) => qr_type.id === parseInt(type)
    );

    if (selectedType) {
      const { type_name } = selectedType;
      let FormComponent;

      switch (type_name) {
        case "string":
          FormComponent = StringForm;
          break;
        case "wifi_connect":
          FormComponent = WifiConnectForm;
          break;
        case "mecard":
          FormComponent = MCardForm;
          break;
        case "vcard":
          FormComponent = VCardForm;
          break;
        case "geoLocation":
          FormComponent = LocationForm;
          break;
        case "epc":
          FormComponent = EPCForm;
          break;
        default:
          FormComponent = null;
      }

      return FormComponent ? <FormComponent onChange={this.onChange} /> : null;
    }
    return null;
  };

  render() {
    const { name, type, scale, border, dark, light, data_dark, data_light } = this.state;

    return (
      <>
        <Modal.Header>
          {name === "" ? "Create New QR Code" : name}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={this.onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={type}
                onChange={this.onChange}
              >
                <option value="">-- Select QR Type --</option>
                {this.props.qr_code_types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {this.get_qr_code_form(type)}

            <Accordion defaultActiveKey="1">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Design Settings</Accordion.Header>
                <Accordion.Body>
                  <Form.Label>Scale {scale}</Form.Label>
                  <Form.Range
                    onChange={this.onChange}
                    name="scale"
                    value={scale}
                  />
                  <Form.Label>Border {border}</Form.Label>
                  <Form.Range
                    onChange={this.onChange}
                    name="border"
                    value={border}
                  />
                  <Row>
                    <Col>
                      <Form.Label>Data Dark</Form.Label>
                      <Form.Control
                        type="color"
                        value={data_dark}
                        name="data_dark"
                        onChange={this.onChange}
                      />
                      <Form.Label>Data Light</Form.Label>
                      <Form.Control
                        type="color"
                        value={data_light}
                        name="data_light"
                        onChange={this.onChange}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Light</Form.Label>
                      <Form.Control
                        type="color"
                        value={light || "#ffffff"}
                        name="light"
                        onChange={this.onChange}
                      />
                      <Form.Label>Dark</Form.Label>
                      <Form.Control
                        type="color"
                        value={dark}
                        name="dark"
                        onChange={this.onChange}
                      />
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

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

export default connect(mapStateToProps, { addQrCode, getQrCodeTypes })(LeadForm);
