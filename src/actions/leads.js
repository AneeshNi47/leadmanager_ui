import axios from "axios";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";
import { BASE_URL } from "./types";

export const getLeads = () => (dispatch, getState) => {
  axios
    .get(`${BASE_URL}/api/leads/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteLead = (id) => (dispatch, getState) => {
  axios
    .delete(`${BASE_URL}/api/leads/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ leadDeleted: "Lead Successfully deleted" }));
      dispatch({
        type: DELETE_LEAD,
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

export const addLead = (lead) => (dispatch, getState) => {
  axios
    .post(`${BASE_URL}/api/leads/`, lead, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ leadAdded: "Lead Successfully Added" }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
