import { controller } from "~/controllers";

const loadprojectGetRoute = [
    ["/loadproject", controller.authorizationController.checkLoggedIn],
    ["/loadproject", controller.tbController.checkPid],
    ["/loadproject", controller.tbController.verifyUserExists],
    ["/loadproject", controller.tbController.getUsersInProj],
    ["/loadproject", controller.tbController.getTicketsInProj],
    ["/loadproject", controller.tbController.sendProjData],
];

export { loadprojectGetRoute };
