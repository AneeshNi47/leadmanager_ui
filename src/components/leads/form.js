import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead, getLeadStatus, updateLead } from "../../actions/leads";
import { Form, Modal, Button } from "react-bootstrap";

export class LeadForm extends Component {
  state = {
    name: "",
    email: "",
    message: "",
    status: null,
  };
  static propTypes = {
    addLead: PropTypes.func.isRequired,
    leads_status: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const { data } = this.props;
    if (data !== null) {
      this.props.getLeadStatus();
      this.setState({
        name: data.name,
        email: data.email,
        message: data.message,
        status: data.status,
      });
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, message, status } = this.state;
    const lead = { name, email, message, status };
    if (this.props.data) {
      this.props.updateLead(this.props.data.id, lead);
    } else {
      this.props.addLead(lead);
    }
    this.setState({
      name: "",
      email: "",
      message: "",
      status: null,
    });
    this.props.closeForm();
  };
  render() {
    const { name, email, message, status } = this.state;
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
              {this.props.data ? (
                <Form.Group className="mb-3" controlId="formType">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    type="number"
                    name="status"
                    value={status}
                    onChange={this.onChange}
                  >
                    {this.props.leads_status.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.status_title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              ) : (
                ""
              )}
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

const mapStateToProps = (state) => ({
  leads_status: state.leadReducer.leads_status,
});

export default connect(mapStateToProps, { addLead, getLeadStatus, updateLead })(
  LeadForm
);
