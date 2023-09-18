import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
  getQrCode,
  deleteQrCode,
  generateQRCode,
  getQrCodeTypes,
  clearURLCache,
} from "../../actions/qr_codes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Table, Modal, Button } from "react-bootstrap";

class QRCodes extends Component {
  state = {
    ws: null,
    modalIsOpen: false,
    currentQRCodeURL: "",
    selectedId: null,
    loading: false,
  };

  static propTypes = {
    qr_codes: PropTypes.array.isRequired,
    getQrCodeTypes: PropTypes.func.isRequired,
    getQrCode: PropTypes.func.isRequired,
    deleteQrCode: PropTypes.func.isRequired,
    generateQRCode: PropTypes.func.isRequired,
  };

  openModal = (url, id) => {
    console.log("urk", url);
    this.setState({
      modalIsOpen: true,
      selectedId: id,
      currentQRCodeURL: url,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      selectedId: null,
      currentQRCodeURL: null,
    });
    URL.revokeObjectURL(this.state.currentQRCodeURL);
    this.props.clearURLCache();
  };

  componentDidMount() {
    this.props.getQrCode();
    this.props.getQrCodeTypes();
  }

  render() {
    const { qr_codes, qr_code_types } = this.props;
    return (
      <div>
        <h1>
          List of QR Codes{" "}
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="btn"
            onClick={this.props.openForm}
          />
        </h1>
        <Table striped="columns">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {qr_codes.map((qr_code, i) => {
              const qr_code_type = qr_code_types.filter(
                (qr_type) => qr_type.id === qr_code.qr_type
              )[0];
              return (
                <tr key={qr_code.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{qr_code.name}</td>
                  <td>
                    {qr_code_type !== undefined ? qr_code_type.name : "--"}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ margin: "2px", padding: "2px" }}
                      className="btn"
                      onClick={this.props.deleteQrCode.bind(this, qr_code.id)}
                    />
                    <FontAwesomeIcon
                      style={{ margin: "2px", padding: "2px" }}
                      icon={faPencil}
                      className="btn"
                    />
                    <FontAwesomeIcon
                      style={{ margin: "2px", padding: "2px" }}
                      icon={faEye}
                      className="btn"
                      onClick={async () => {
                        this.setState({
                          loading: true,
                          currentQRCodeURL: null,
                        });
                        try {
                          await this.props.generateQRCode(qr_code.id, false);
                          this.openModal(this.props.url, qr_code.id);
                        } catch (error) {
                          console.log(error);
                        }
                        this.setState({ loading: false });
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
          <img src={this.state.currentQRCodeURL} alt="QR Code" />
          <Button
            onClick={() =>
              this.props.generateQRCode(this.state.selectedId, true)
            }
          >
            Download
          </Button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  qr_codes: state.qrCodeReducer.qr_codes,
  url: state.qrCodeReducer.qr_code_url,
  qr_code_types: state.qrCodeReducer.qr_code_types,
});

export default connect(mapStateToProps, {
  getQrCode,
  deleteQrCode,
  generateQRCode,
  getQrCodeTypes,
  clearURLCache,
})(QRCodes);
