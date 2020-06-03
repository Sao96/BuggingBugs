import { ticketboardController } from "./TicketboardController/";
import { authorizationController } from "./AuthorizationController/";
//combine all controllers
const controller = {
    tbController: ticketboardController,
    authorizationController: authorizationController,
};

export { controller };
