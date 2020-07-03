import { controller } from "~/controllers";

const deleteticketPostRoute = [
    ["/deleteticket", controller.authorizationController.checkLoggedIn],
    ["/deleteticket", controller.tbController.checkPid],
    ["/deleteticket", controller.tbController.checkTicketExists],
    ["/deleteticket", controller.tbController.verifyIsLeader],
    ["/deleteticket", controller.tbController.deleteTicket],
];

export { deleteticketPostRoute };
