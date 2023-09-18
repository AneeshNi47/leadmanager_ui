import { combineReducers } from "redux";
import leads from "./leads";
import qr_codes from "./qr_codes";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  leadReducer: leads,
  qrCodeReducer: qr_codes,
  errorReducer: errors,
  messageReducer: messages,
  authReducer: auth,
});
