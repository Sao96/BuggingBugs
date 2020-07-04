import { controller } from "~/controllers";

const updateticketstatusPostRoute = [
    ["/updateticketstatus", controller.authorizationController.checkLoggedIn],
    ["/updateticketstatus", controller.tbController.checkPid],
    ["/updateticketstatus", controller.tbController.verifyUserExists],
    ["/updateticketstatus", controller.tbController.checkTicketExists],
    ["/updateticketstatus", controller.tbController.validateTicketStatusUpdate],
    ["/updateticketstatus", controller.tbController.updateTicketStatus],
];

export { updateticketstatusPostRoute };
