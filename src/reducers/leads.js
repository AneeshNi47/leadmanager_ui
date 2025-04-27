import {
  GET_LEADS,
  DELETE_LEAD,
  ADD_LEAD,
  GET_LEAD_STATUS,
  UPDATE_LEAD,
} from "../actions/types";

const initialState = {
  leads: [],
  leads_status: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEAD_STATUS:
      return {
        ...state,
        leads_status: action.payload,
      };
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload,
      };
    case ADD_LEAD:
      return {
        ...state,
        leads: [...state.leads, action.payload],
      };
    case UPDATE_LEAD:
      let updatedLeads = [...state.leads];
      for (let i = 0; i < updatedLeads.length; i++) {
        if (updatedLeads[i].id === action.payload.id) {
          updatedLeads[i] = action.payload;
          break;
        }
      }
      return {
        ...state,
        leads: updatedLeads,
      };
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id !== action.payload),
      };
    default:
      return state;
  }
}
