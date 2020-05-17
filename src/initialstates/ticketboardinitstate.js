import { ticketboardActions } from "actions/ticketboardactions.js";
const ticketboardInitialState = {
    [ticketboardActions.DISPLAY_SEARCH_FILTER]: false,
    [ticketboardActions.FILTER_TS_OPEN]: false,
    [ticketboardActions.FILTER_TS_IN_PROGRESS]: false,
    [ticketboardActions.FILTER_TS_PENDING_APPROVAL]: false,
    [ticketboardActions.FILTER_TS_CLOSED]: false,
    [ticketboardActions.CREATE_PROJECT_MODAL_OPEN]: false,
    [ticketboardActions.MODAL_REF]: null,
    [ticketboardActions.MODAL_ACTIVE]: false,
};

export { ticketboardInitialState };
