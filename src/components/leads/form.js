import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead } from "../../actions/leads";
import { Form, Modal, Button } from "react-bootstrap";

export class LeadForm extends Component {
  state = {
    name: "",
    email: "",
    message: "",
  };
  static propTypes = {
    addLead: PropTypes.func.isRequired,
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const lead = { name, email, message };
    this.props.addLead(lead);
    this.setState({
      name: "",
      email: "",
      message: "",
    });
    this.props.closeForm();
  };
  render() {
    const { name, email, message } = this.state;
    return (
      <>
        <Modal.Header>{name === "" ? "Add New Lead" : name}</Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={name}
                onChange={this.onChange}
                id="exampleFormControlInput1"
                placeholder="John Doe"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.onChange}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={message}
                onChange={this.onChange}
                name="message"
              ></textarea>
            </Form.Group>
            <Button className="submit" onClick={this.onSubmit}>
              Submit{" "}
            </Button>
          </Form>
        </Modal.Body>
      </>
    );
  }
}

export default connect(null, { addLead })(LeadForm);
