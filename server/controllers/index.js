import { ticketboardController } from "./TicketboardController/";
import { projectboardController } from "./ProjectboardController";
import { authorizationController } from "./AuthorizationController/";
import { userController } from "./UserController";
//combine all controllers
const controller = {
    tbController: ticketboardController,
    authorizationController: authorizationController,
    projectboardController: projectboardController,
    userController: userController,
};

export { controller };
