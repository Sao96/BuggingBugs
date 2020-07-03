import { controller } from "~/controllers";

const promoteuserPostRoute = [
    ["/promoteuser", controller.authorizationController.checkLoggedIn],
    ["/promoteuser", controller.tbController.checkPid],
    ["/promoteuser", controller.tbController.verifyIsLeader],
    ["/promoteuser", controller.tbController.verifyToIsNotLeader],
    ["/promoteuser", controller.tbController.promoteUser],
];

export { promoteuserPostRoute };
