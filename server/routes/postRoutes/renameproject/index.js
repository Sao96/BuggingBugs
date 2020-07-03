import { controller } from "~/controllers";

const renameprojectPostRoute = [
    ["/renameproject", controller.authorizationController.checkLoggedIn],
    ["/renameproject", controller.tbController.validateProjectName],
    ["/renameproject", controller.tbController.checkPid],
    ["/renameproject", controller.tbController.verifyIsLeader],
    ["/renameproject", controller.tbController.renameProject],
];

export { renameprojectPostRoute };
