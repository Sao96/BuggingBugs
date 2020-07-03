import { controller } from "~/controllers";

const updatepfpPostRoute = [
    ["/updatepfp", controller.authorizationController.checkLoggedIn],
    ["/updatepfp", controller.userController.updatePfp],
];

export { updatepfpPostRoute };
