import { ticketboardActions } from "actions/ticketboardactions.js"; //actions
import { ticketboardInitialState } from "initialstates/ticketboardinitstate.js";
import { ticketboardFields } from "fields/ticketboardfields.js";
function ticketboardReducer(prevState = ticketboardInitialState, action) {
    let newState = { ...prevState };
    switch (action.type) {
        case ticketboardActions.SET_TICKETBOARD_INFO:
            newState[ticketboardFields.UID] = action.uid;
            newState[ticketboardFields.USERS] = action.users;
            newState[ticketboardFields.TICKETS] = action.tickets;
            newState[ticketboardFields.AUTH_LEVEL] = action.authLevel;
            break;
        case ticketboardActions.SET_REFRESH_NEEDED:
            newState[ticketboardFields.REFRESH_NEEDED] = !newState[
                ticketboardFields.REFRESH_NEEDED
            ];
            break;
        case ticketboardActions.SET_DISP_TICKET_INFO:
            newState[ticketboardFields.DISP_TICKET_INFO] = {
                ...action.ticketInfo,
            };
            break;
        case ticketboardActions.SET_TICKET_MODIFIED:
            newState[ticketboardFields.TICKET_MODIFIED] = true;
            break;
        case ticketboardActions.UPDATE_DISP_TICKET_INFO:
            for (let field in action.data) {
                newState[ticketboardFields.DISP_TICKET_INFO][field] =
                    action.data[field];
            }
            break;
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
            break;
        case ticketboardActions.FLUSH_TICKETBOARD_STATE:
            return ticketboardInitialState;
        case ticketboardActions.FLUSH_DISP_TICKET_STATE:
            newState[ticketboardFields.DISP_TICKET_INFO] = {
                priority: "",
                dueTime: "",
                time: "",
                tags: "",
                environment: "",
                summary: "",
            };
            break;
    }
    return newState;
}
export { ticketboardReducer };
