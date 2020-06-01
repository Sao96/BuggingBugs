import { ticketboardController } from "./TicketboardController/";
import { authorizationController } from "./AuthorizationController/";
//combine all controllers
const controller = {
    tbController: ticketboardController,
    authController: authorizationController,
};

export { controller };