import {
  GET_QR_CODES,
  ADD_QR_CODE,
  DELETE_QR_CODE,
  GENERATE_QR_CODE,
  GET_QR_CODE_TYPES,
  REMOVE_IMAGE_URL,
} from "../actions/types";

const initialState = {
  qr_codes: [],
  qr_code_types: [],
  qr_code_url: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QR_CODE_TYPES:
      return {
        ...state,
        qr_code_types: action.payload,
      };
    case REMOVE_IMAGE_URL:
      return {
        ...state,
        qr_code_url: null,
      };
    case GET_QR_CODES:
      return {
        ...state,
        qr_codes: action.payload,
      };
    case GENERATE_QR_CODE:
      console.log("action.payload");
      return {
        ...state,
        qr_code_url: action.payload,
      };
    case ADD_QR_CODE:
      return {
        ...state,
        qr_code_url: action.payload,
      };
    case DELETE_QR_CODE:
      return {
        ...state,
        qr_codes: state.qr_codes.filter(
          (qr_code) => qr_code.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
