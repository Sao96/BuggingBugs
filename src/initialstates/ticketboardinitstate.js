import { ticketboardFields } from "fields/ticketboardfields.js";
const ticketboardInitialState = {
    [ticketboardFields.DISPLAY_SEARCH_FILTER]: false,
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
    },
};

export { ticketboardInitialState };
