import { controller } from "~/controllers";

const updateticketPostRoute = [
    ["/updateticket", controller.authorizationController.checkLoggedIn],
    ["/updateticket", controller.tbController.validateTicketFields],
    ["/updateticket", controller.tbController.checkTicketExists],
    ["/updateticket", controller.tbController.getUsersInProj],
    ["/updateticket", controller.tbController.checkUsersInProj],
    ["/updateticket", controller.tbController.updateTicket],
];

export { updateticketPostRoute };
