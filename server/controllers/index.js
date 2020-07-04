import { ticketboardController } from "./TicketboardController/";
import { projectboardController } from "./ProjectboardController";
import { authorizationController } from "./AuthorizationController/";
import { userController } from "./UserController";
import { demoController } from "./DemoController";
//combine all controllers
const controller = {
    tbController: ticketboardController,
    authorizationController: authorizationController,
    projectboardController: projectboardController,
    userController: userController,
    demoController: demoController,
};

Object.freeze(controller);

export { controller };
