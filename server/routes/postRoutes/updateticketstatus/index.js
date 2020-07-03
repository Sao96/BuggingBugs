import { controller } from "~/controllers";

const updateticketstatusPostRoute = [
    ["/updateticket", controller.authorizationController.checkLoggedIn],
    ["/updateticket", controller.tbController.validateTicketFields],
    ["/updateticket", controller.tbController.checkTicketExists],
    ["/updateticket", controller.tbController.getUsersInProj],
    ["/updateticket", controller.tbController.checkUsersInProj],
    ["/updateticket", controller.tbController.updateTicket],
];

export { updateticketstatusPostRoute };
