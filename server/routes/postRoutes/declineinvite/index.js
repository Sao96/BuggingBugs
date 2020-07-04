import { controller } from "~/controllers";

const declineinvitePostRoute = [
    ["/declineinvite", controller.authorizationController.checkLoggedIn],
    ["/declineinvite", controller.projectboardController.checkInviteExists],
    ["/declineinvite", controller.projectboardController.deleteInvite],
];

export { declineinvitePostRoute };
