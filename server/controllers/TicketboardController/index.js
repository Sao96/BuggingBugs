import { getTickets } from "./ControllerMethods/GetTickets";
import { validateTicket } from "./ControllerMethods/ValidateTicket";
// import { createTicket } from "./validateticket.js";
// import { updateTicket } from "./updateticket.js";

const ticketboardController = {
    getTickets: getTickets,
    validateTicket: validateTicket,
    // createTicket: createTicket,
    // updateTicket: updateTicket,
};

export { ticketboardController };
