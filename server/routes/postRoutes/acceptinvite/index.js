import { controller } from "~/controllers";

const acceptinvitePostRoute = [
    ["/acceptinvite", controller.authorizationController.checkLoggedIn],
    ["/acceptinvite", controller.projectboardController.checkInviteExists],
    ["/acceptinvite", controller.projectboardController.addUserToProject],
    ["/acceptinvite", controller.projectboardController.deleteInvite],
];

export { acceptinvitePostRoute };
