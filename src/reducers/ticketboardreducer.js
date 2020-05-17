import { ticketboardActions } from "actions/ticketboardactions.js"; //actions
import { ticketboardInitialState } from "initialstates/ticketboardinitstate.js";
function ticketboardReducer(prevState = ticketboardInitialState, action) {
    let newState = { ...prevState };
    switch (action.type) {
        case ticketboardActions.MODAL_ACTIVE:
            newState[ticketboardActions.MODAL_ACTIVE] = !newState[
                ticketboardActions.MODAL_ACTIVE
            ];
            break;
        case ticketboardActions.DISPLAY_SEARCH_FILTER:
            newState[ticketboardActions.DISPLAY_SEARCH_FILTER] = !newState[
                ticketboardActions.DISPLAY_SEARCH_FILTER
            ];
            break;
        case ticketboardActions.FILTER_TS_OPEN:
            newState[ticketboardActions.FILTER_TS_OPEN] = !newState[
                ticketboardActions.FILTER_TS_OPEN
            ];
            break;
        case ticketboardActions.FILTER_TS_IN_PROGRESS:
            newState[ticketboardActions.FILTER_TS_IN_PROGRESS] = !newState[
                ticketboardActions.FILTER_TS_IN_PROGRESS
            ];
            break;
        case ticketboardActions.FILTER_TS_PENDING_APPROVAL:
            newState[ticketboardActions.FILTER_TS_PENDING_APPROVAL] = !newState[
                ticketboardActions.FILTER_TS_PENDING_APPROVAL
            ];
            break;
        case ticketboardActions.FILTER_TS_CLOSED:
            newState[ticketboardActions.FILTER_TS_CLOSED] = !newState[
                ticketboardActions.FILTER_TS_CLOSED
            ];
            break;
        case ticketboardActions.CREATE_PROJECT_MODAL_OPEN:
            newState[ticketboardActions.CREATE_PROJECT_MODAL_OPEN] = !newState[
                ticketboardActions.CREATE_PROJECT_MODAL_OPEN
            ];
            break;
        case ticketboardActions.MODAL_REF:
            newState[ticketboardActions.MODAL_REF] = action.modalRef;
            break;
    }
    return newState;
}
export { ticketboardReducer };
