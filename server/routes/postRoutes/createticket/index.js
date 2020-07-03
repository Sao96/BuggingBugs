import { controller } from "~/controllers";

const createticketPostRoute = [
    ["/createticket", controller.authorizationController.checkLoggedIn],
    ["/createticket", controller.tbController.validateTicketFields],
    ["/createticket", controller.tbController.getUsersInProj],
    ["/createticket", controller.tbController.checkUsersInProj],
    ["/createticket", controller.tbController.createTicket],
];

export { createticketPostRoute };
