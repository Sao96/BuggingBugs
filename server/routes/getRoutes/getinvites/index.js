import { controller } from "~/controllers";

const getinvitesGetRoute = [
    ["/getinvites", controller.authorizationController.checkLoggedIn],
    ["/getinvites", controller.projectboardController.getInvites],
];

export { getinvitesGetRoute };
