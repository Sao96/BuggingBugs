import { controller } from "~/controllers";

const updategroupimagePostRoute = [
    ["/updategroupimage", controller.authorizationController.checkLoggedIn],
    ["/updategroupimage", controller.tbController.checkPid],
    ["/updategroupimage", controller.tbController.verifyIsLeader],
    ["/updategroupimage", controller.tbController.updateGroupImage],
];

export { updategroupimagePostRoute };
