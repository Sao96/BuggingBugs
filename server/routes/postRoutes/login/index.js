import { controller } from "~/controllers";

const loginPostRoute = [
    ["/login", controller.authorizationController.verifyLoginInfo],
    ["/login", controller.authorizationController.userExists],
    ["/login", controller.authorizationController.authenticateUser],
    ["/login", controller.userController.getUserInfo],
    ["/login", controller.authorizationController.getSession],
];

export { loginPostRoute };
