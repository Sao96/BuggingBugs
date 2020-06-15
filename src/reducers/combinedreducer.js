import { combineReducers } from "redux";
import { dashboardReducer } from "./dashboardreducer";
import { ticketboardReducer } from "./ticketboardreducer";
import { sharedReducer } from "./sharedreducer";
import { loginReducer } from "./loginreducer";
const combinedReducer = combineReducers({
    dashboard: dashboardReducer,
    ticketboard: ticketboardReducer,
    shared: sharedReducer,
    login: loginReducer,
});
export { combinedReducer };
