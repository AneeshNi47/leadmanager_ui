import axios from "axios";
import {
  GET_ERRORS,
  ADD_QR_CODE,
  DELETE_QR_CODE,
  GET_QR_CODES,
  GET_QR_CODE_TYPES,
  GENERATE_QR_CODE,
  REMOVE_IMAGE_URL,
} from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";
import { BASE_URL } from "./types";

export const getQrCodeTypes = () => (dispatch, getState) => {
  axios
    .get(`${BASE_URL}/api/qr-code-types/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_QR_CODE_TYPES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const clearURLCache = () => (dispatch) => {
  dispatch({
    type: REMOVE_IMAGE_URL,
  });
};
export const getQrCode = () => (dispatch, getState) => {
  axios
    .get(`${BASE_URL}/api/qr-codes/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_QR_CODES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteQrCode = (id) => (dispatch, getState) => {
  axios
    .delete(`${BASE_URL}/api/qr-codes/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(
        createMessage({ qrCodeDeleted: "QR Code Successfully deleted" })
      );
      dispatch({
        type: DELETE_QR_CODE,
        payload: id,
      });
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

export const generateQRCode = (id, download = false) => {
  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.log("generateing");
      axios
        .get(`${BASE_URL}/api/qr-codes/${id}/generate_qr/`, {
          ...tokenConfig(getState),
          responseType: "blob",
        })
        .then((res) => {
          const blob = new Blob([res.data], { type: "image/png" });
          const url = window.URL.createObjectURL(blob);
          if (download) {
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "qr-code.png");
            document.body.appendChild(link);
            link.click();
          } else {
            console.log("dispatching");
            dispatch({
              type: GENERATE_QR_CODE,
              payload: url,
            });
          }
          resolve();
        })
        .catch((err) => {
          const errors = {
            msg: err.response.data,
            status: err.response.status,
          };
          dispatch({
            type: GET_ERRORS,
            payload: errors,
          });
          reject(err);
        });
    });
  };
};

export const addQrCode = (qr_code) => (dispatch, getState) => {
  console.log(qr_code)
  axios
    .post(`${BASE_URL}/api/qr-codes/`, qr_code, {
      ...tokenConfig(getState),
      responseType: "arraybuffer", // Important: set the responseType to 'arraybuffer'
    })
    .then((res) => {
      dispatch(createMessage({ leadAdded: "QR Code Successfully Added" }));
      dispatch({
        type: ADD_QR_CODE,
        payload: res.data,
      });

      // Step 2: Create an object URL
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "image/png" })
      );

      // Step 3: Open the image in a new window
      const imageElement = document.createElement("img");
      imageElement.src = url;
      document.body.appendChild(imageElement);
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
