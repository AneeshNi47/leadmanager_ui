import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLeads, deleteLead } from "../../actions/leads";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Table, Row, Col } from "react-bootstrap";
import { WS_URL } from "../../actions/types";

class Leads extends Component {
  state = {
    ws: null,
    isWsConnected: false,
  };

  static propTypes = {
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getLeads();
  }

  toggleWebSocket = () => {
    this.setState(
      (prevState) => ({ isWsConnected: !prevState.isWsConnected }),
      () => {
        this.state.isWsConnected ? this.connect() : this.disconnect();
      }
    );
  };

  connect = () => {
    const ws = new WebSocket(`${WS_URL}/ws/leads/`);
    ws.onopen = () => {
      console.log("Connected to the WebSocket");
    };
    ws.onmessage = (evt) => {
      console.log(evt);
      this.props.getLeads();
    };
    ws.onerror = (err) => {
      console.error("WebSocket Error:", err);
    };
    ws.onclose = () => {
      console.log("Disconnected from the WebSocket");
    };
    this.setState({ ws });
  };

  disconnect = () => {
    if (this.state.ws) {
      this.state.ws.close();
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h1>
              Leads{" "}
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="btn"
                onClick={() => this.props.openForm(null)}
              />
            </h1>
          </Col>
          <Col>
            <Form.Check
              type="switch"
              label="Live Updates"
              className="btn"
              checked={this.state.isWsConnected}
              onChange={this.toggleWebSocket}
            />
          </Col>
        </Row>

        <Table striped="columns">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Message</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leads.map((lead, i) => (
              <tr key={lead.id}>
                <th scope="row">{i + 1}</th>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.message}</td>
                <td>{lead.status}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ margin: "2px", padding: "2px" }}
                    className="btn"
                    onClick={this.props.deleteLead.bind(this, lead.id)}
                  />
                  <FontAwesomeIcon
                    style={{ margin: "2px", padding: "2px" }}
                    icon={faPencil}
                    className="btn"
                    onClick={() => this.props.openForm(lead)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  leads: state.leadReducer.leads,
});

export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
