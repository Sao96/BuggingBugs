import { controller } from "~/controllers";

const demoteselfPostRoute = [
    ["/demoteself", controller.authorizationController.checkLoggedIn],
    ["/demoteself", controller.tbController.checkPid],
    ["/demoteself", controller.tbController.verifyIsLeader],
    ["/demoteself", controller.tbController.demoteSelf],
];

export { demoteselfPostRoute };
