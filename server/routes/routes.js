import { controller } from "../controllers/";

const GETRoutes = [["/gettickets", controller.tbController.getTickets]];
const POSTRoutes = [
    ["/login", controller.authorizationController.verifyInfo],
    ["/login", controller.authorizationController.userExists],
    ["/login", controller.authorizationController.authenticateUser],
    ["/login", controller.authorizationController.getSession],
    ["/register", controller.authorizationController.verifyInfo],
    ["/register", controller.authorizationController.userExists],
    ["/gettickets", controller.tbController.getTickets],
    // ["/createticket", controller.tbController.validateTicket],
    // ["/createticket", controller.tbController.uploadTicket],
    // ["/updateticket", controller.tbController.validateTicket],
    // ["/updateticket", controller.tbController.uploadTicket],
];

export { GETRoutes, POSTRoutes };
