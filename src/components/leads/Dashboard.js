import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OwnLeads from "./own_leads";
import AllLeads from "./all_leads";
import Form from "./form";
import { loadUser, get_users } from "../../actions/auth";
import { Modal, Tabs, Tab } from "react-bootstrap";

class LeadsDashboard extends Component {
  state = {
    addLeadForm: false,
    edit_lead_data: null,
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    get_users: PropTypes.func.isRequired,
  };
  componentDidMount() {
    if (this.props.user.is_superuser) {
      this.props.get_users();
    }
  }
  onOpenForm = (data) =>
    this.setState({ addLeadForm: true, edit_lead_data: data });

  handleClose = () => this.setState({ addLeadForm: false });

  render() {
    const { addLeadForm, edit_lead_data } = this.state;
    console.log(this.props.user);
    return (
      <Fragment>
        <Tabs
          defaultActiveKey="own_leads"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="own_leads" title="My Leads">
            <OwnLeads openForm={this.onOpenForm} />
          </Tab>
          {this.props.user.is_superuser ? (
            <Tab eventKey="user_leads" title="Other Leads">
              <AllLeads openForm={this.onOpenForm} />
            </Tab>
          ) : (
            ""
          )}
        </Tabs>

        <Modal show={addLeadForm} onHide={this.handleClose}>
          <Form closeForm={this.handleClose} data={edit_lead_data} />
        </Modal>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { loadUser, get_users })(
  LeadsDashboard
);
