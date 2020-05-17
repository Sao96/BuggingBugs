import { combineReducers } from "redux";
import { dashboardReducer } from "./dashboardreducer.js";
import { ticketboardReducer } from "./ticketboardreducer.js";
import { sharedReducer } from "./sharedreducer.js";

const combinedReducer = combineReducers({
    dashboard: dashboardReducer,
    ticketboard: ticketboardReducer,
    shared: sharedReducer,
});
export { combinedReducer };
