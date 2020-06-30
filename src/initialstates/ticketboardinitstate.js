import { ticketboardFields } from "fields/ticketboardfields.js";
const ticketboardInitialState = {
    [ticketboardFields.UID]: "",
    [ticketboardFields.PID]: "",
    [ticketboardFields.USERS]: [],
    [ticketboardFields.TICKETS]: [],
    [ticketboardFields.AUTH_LEVEL]: -1,
    [ticketboardFields.DISPLAY_SEARCH_FILTER]: false,
    [ticketboardFields.TICKET_MODIFIED]: false,
    [ticketboardFields.FILTER_TS_OPEN]: false,
    [ticketboardFields.FILTER_TS_IN_PROGRESS]: false,
    [ticketboardFields.FILTER_TS_PENDING_APPROVAL]: false,
    [ticketboardFields.FILTER_TS_CLOSED]: false,
    [ticketboardFields.DISP_TICKET_INFO]: {
        priority: "",
        dueTime: "",
        time: "",
        tags: "",
        environment: "",
        summary: "",
        tid: "",
        status: -1,
    },
    [ticketboardFields.NEW_TICKET_FORM_INFO]: {
        to: "",
        priority: 0,
        due: "",
        time: "",
        tags: "",
        environment: "",
        headline: "",
        summary: "",
    },
};

export { ticketboardInitialState };
