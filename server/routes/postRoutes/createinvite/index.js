import { controller } from "~/controllers";

const createinvitePostRoute = [
    ["/createinvite", controller.authorizationController.checkLoggedIn],
    ["/createinvite", controller.tbController.validateInviteFields],
    ["/createinvite", controller.tbController.checkPid],
    ["/createinvite", controller.authorizationController.checkUidsExist],
    ["/createinvite", controller.tbController.checkAlreadyInvited],
    ["/createinvite", controller.tbController.getUsersInProj],
    ["/createinvite", controller.tbController.checkUsersInProj],
    ["/createinvite", controller.tbController.createInvite],
];

export { createinvitePostRoute };
