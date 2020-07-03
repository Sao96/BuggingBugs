import { controller } from "~/controllers";

const leaveprojectPostRoute = [
    ["/leaveproject", controller.authorizationController.checkLoggedIn],
    ["/leaveproject", controller.tbController.checkPid],
    ["/leaveproject", controller.tbController.verifyUserExists],
    ["/leaveproject", controller.tbController.leaveProject],
];

export { leaveprojectPostRoute };
