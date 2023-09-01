import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getLeads, deleteLead } from "../../actions/leads";

export class Leads extends Component {
  state = {};
  static propTypes = {
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.getLeads();
  }
  render() {
    return (
      <div>
        <button>Add Lead</button>
        <h1>List of Leads</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Message</th>
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
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={this.props.deleteLead.bind(this, lead.id)}
                  >
                    Del
                  </button>
                  <button className="btn btn-success btn-sm">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  leads: state.leadReducer.leads,
});
export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
