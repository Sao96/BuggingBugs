import { controller } from "../controllers/";

const GETRoutes = [["/gettickets", controller.tbController.getTickets]];
const POSTRoutes = [
    ["/login", controller.authController.login],
    ["/gettickets", controller.tbController.getTickets],
    ["/createticket", controller.tbController.validateTicket],
    // ["/createticket", controller.tbController.uploadTicket],
    // ["/updateticket", controller.tbController.validateTicket],
    // ["/updateticket", controller.tbController.uploadTicket],
];

export { GETRoutes, POSTRoutes };
