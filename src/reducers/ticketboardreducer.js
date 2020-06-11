import { ticketboardActions } from "actions/ticketboardactions.js"; //actions
import { ticketboardInitialState } from "initialstates/ticketboardinitstate.js";
import { ticketboardFields } from "fields/ticketboardfields.js";
function ticketboardReducer(prevState = ticketboardInitialState, action) {
    let newState = { ...prevState };
    switch (action.type) {
        case ticketboardActions.SET_DISPLAY_SEARCH_FILTER:
            newState[ticketboardFields.DISPLAY_SEARCH_FILTER] = !newState[
                ticketboardFields.DISPLAY_SEARCH_FILTER
            ];
            break;
        case ticketboardActions.SET_FILTER_TS_OPEN:
            newState[ticketboardFields.FILTER_TS_OPEN] = !newState[
                ticketboardFields.FILTER_TS_OPEN
            ];
            break;
        case ticketboardActions.SET_FILTER_TS_IN_PROGRESS:
            newState[ticketboardFields.FILTER_TS_IN_PROGRESS] = !newState[
                ticketboardFields.FILTER_TS_IN_PROGRESS
            ];
            break;
        case ticketboardActions.SET_FILTER_TS_PENDING_APPROVAL:
            newState[ticketboardFields.FILTER_TS_PENDING_APPROVAL] = !newState[
                ticketboardFields.FILTER_TS_PENDING_APPROVAL
            ];
            break;
        case ticketboardActions.SET_FILTER_TS_CLOSED:
            newState[ticketboardFields.FILTER_TS_CLOSED] = !newState[
                ticketboardFields.FILTER_TS_CLOSED
            ];
            break;
        case ticketboardActions.SET_DISP_TICKET_INFO:
            newState[ticketboardFields.DISP_TICKET_INFO] = {
                ...action.ticketInfo,
            };
            break;
        case ticketboardActions.FLUSH_CREATE_FORM_INFO:
            newState[ticketboardFields.NEW_TICKET_FORM_INFO] = {
                to: "",
                priority: 0,
                due: "",
                time: "",
                tags: "",
                environment: "",
                headline: "",
                summary: "",
            };
        case ticketboardActions.SET_CREATE_FORM_INFO:
            newState[ticketboardFields.NEW_TICKET_FORM_INFO] = {
                ...action.initVals,
            };
    }
    return newState;
}
export { ticketboardReducer };
