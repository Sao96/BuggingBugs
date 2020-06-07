import { ticketboardController } from "./TicketboardController/";
import { projectboardController } from "./ProjectboardController";
import { authorizationController } from "./AuthorizationController/";

//combine all controllers
const controller = {
    tbController: ticketboardController,
    authorizationController: authorizationController,
    projectboardController: projectboardController,
};

export { controller };
