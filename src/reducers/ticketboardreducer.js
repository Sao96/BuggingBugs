import { ticketboardActions as tbA } from "actions/ticketboardactions.js";
import { ticketboardInitialState } from "initialstates/ticketboardinitstate.js";
import { ticketboardFields as tbF } from "fields/ticketboardfields.js";

function ticketboardReducer(prevState = ticketboardInitialState, action) {
    let newState = { ...prevState };
    switch (action.type) {
        case tbA.SET_PID:
            newState[tbF.PID] = action.pid;
            break;
        case tbA.SET_TICKETBOARD_INFO:
            action.tickets.sort((a, b) => {
                if (a.priority < b.priority) {
                    return -1;
                } else if (a.priority === b.priority && a.due <= b.due) {
                    return -1;
                }

                return 1;
            });
            newState[tbF.UID] = action.uid;
            newState[tbF.USERS] = action.users;
            newState[tbF.TICKETS] = action.tickets;
            newState[tbF.AUTH_LEVEL] = action.authLevel;
            break;
        case tbA.SET_REFRESH_NEEDED:
            newState[tbF.REFRESH_NEEDED] = !newState[tbF.REFRESH_NEEDED];
            break;
        case tbA.SET_DISP_TICKET_INFO:
            newState[tbF.DISP_TICKET_INFO] = {
                ...action.ticketInfo,
            };
            break;
        case tbA.SET_TICKET_MODIFIED:
            newState[tbF.TICKET_MODIFIED] = true;
            break;
        case tbA.UPDATE_DISP_TICKET_INFO:
            for (let field in action.data) {
                newState[tbF.DISP_TICKET_INFO][field] = action.data[field];
            }
            break;
        case tbA.SET_DISPLAY_SEARCH_FILTER:
            newState[tbF.DISPLAY_SEARCH_FILTER] = !newState[
                tbF.DISPLAY_SEARCH_FILTER
            ];
            break;
        case tbA.SET_FILTER_TS_OPEN:
            newState[tbF.FILTER_TS_OPEN] = !newState[tbF.FILTER_TS_OPEN];
            break;
        case tbA.SET_FILTER_TS_IN_PROGRESS:
            newState[tbF.FILTER_TS_IN_PROGRESS] = !newState[
                tbF.FILTER_TS_IN_PROGRESS
            ];
            break;
        case tbA.SET_FILTER_TS_PENDING_APPROVAL:
            newState[tbF.FILTER_TS_PENDING_APPROVAL] = !newState[
                tbF.FILTER_TS_PENDING_APPROVAL
            ];
            break;
        case tbA.SET_FILTER_TS_CLOSED:
            newState[tbF.FILTER_TS_CLOSED] = !newState[tbF.FILTER_TS_CLOSED];
            break;
        case tbA.FLUSH_CREATE_FORM_INFO:
            newState[tbF.NEW_TICKET_FORM_INFO] = {
                to: "",
                priority: 0,
                due: "",
                time: "",
                tags: "",
                environment: "",
                headline: "",
                summary: "",
            };
        case tbA.SET_CREATE_FORM_INFO:
            newState[tbF.NEW_TICKET_FORM_INFO] = {
                ...action.initVals,
            };
            break;
        case tbA.FLUSH_TICKETBOARD_STATE:
            return ticketboardInitialState;
        case tbA.FLUSH_DISP_TICKET_STATE:
            newState[tbF.DISP_TICKET_INFO] = {
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
