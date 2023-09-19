import { Form } from "react-bootstrap";

export const StringForm = ({ onChange }) => (
  <Form.Group className="mb-3">
    <Form.Label>String</Form.Label>
    <Form.Control type="text" name="string" onChange={onChange} />
  </Form.Group>
);
export const WifiConnectForm = ({ onChange }) => (
  <Form.Group className="mb-3">
    <Form.Label>SSID</Form.Label>
    <Form.Control type="text" name="ssid" onChange={onChange} />
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" name="password" onChange={onChange} />
    <Form.Label>Security</Form.Label>
    <Form.Control type="text" name="security" onChange={onChange} />
  </Form.Group>
);
export const MCardForm = ({ onChange }) => (
  <Form.Group className="mb-3">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" name="name" onChange={onChange} />
    <Form.Label>Email</Form.Label>
    <Form.Control type="text" name="email" onChange={onChange} />
    <Form.Label>Phone</Form.Label>
    <Form.Control type="text" name="phone" onChange={onChange} />
    <Form.Label>URL</Form.Label>
    <Form.Control type="text" name="url" onChange={onChange} />
  </Form.Group>
);
export const VCardForm = ({ onChange }) => (
  <Form.Group className="mb-3">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" name="name" onChange={onChange} />
    <Form.Label>Display Name</Form.Label>
    <Form.Control type="text" name="displayname" onChange={onChange} />
    <Form.Label>Email</Form.Label>
    <Form.Control type="text" name="email" onChange={onChange} />
    <Form.Label>Phone</Form.Label>
    <Form.Control type="text" name="phone" onChange={onChange} />
    <Form.Label>URL</Form.Label>
    <Form.Control type="text" name="url" onChange={onChange} />
  </Form.Group>
);
export const LocationForm = ({ onChange }) => (
  <Form.Group className="mb-3">
    <Form.Label>Latitude</Form.Label>
    <Form.Control type="number" name="latitude" onChange={onChange} />
    <Form.Label>Longitude</Form.Label>
    <Form.Control type="number" name="longitude" onChange={onChange} />
  </Form.Group>
);
export const EPCForm = ({ onChange }) => (
  <Form.Group className="mb-3">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" name="name" onChange={onChange} />
    <Form.Label>IBAN</Form.Label>
    <Form.Control type="text" name="iban" onChange={onChange} />
    <Form.Label>Amount</Form.Label>
    <Form.Control type="text" name="amount" onChange={onChange} />
    <Form.Label>Text</Form.Label>
    <Form.Control type="text" name="text" onChange={onChange} />
    <Form.Label>Encoding</Form.Label>
    <Form.Control type="text" name="encoding" onChange={onChange} />
  </Form.Group>
);

export const information_maker = (state, type) => {
  var information = {};
  switch (type) {
    case "1":
      information = {
        string: state.string,
      };
      break;

    case "2":
      information = {
        ssid: state.ssid,
        password: state.password,
        security: state.security,
      };
      break;

    case "3":
      information = {
        name: state.name,
        email: state.email,
        url: state.url,
      };
      break;

    case "4":
      information = {
        name: state.name,
        displayname: state.displayname,
        email: state.email,
        url: state.url,
      };
      break;
    case "5":
      information = {
        longitude: parseInt(state.longitude),
        latitude: parseInt(state.latitude),
      };
      break;
    case "6":
      information = {
        name: state.name,
        iban: state.iban,
        amount: state.amount,
        text: state.text,
      };
      break;
    default:
      break;
  }

  return information;
};
