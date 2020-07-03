import { controller } from "~/controllers";

const removeuserPostRoute = [
    ["/removeuser", controller.authorizationController.checkLoggedIn],
    ["/removeuser", controller.tbController.checkPid],
    ["/removeuser", controller.tbController.verifyIsLeader],
    ["/removeuser", controller.tbController.verifyToIsNotLeader],
    ["/removeuser", controller.tbController.removeUser],
];

export { removeuserPostRoute };
