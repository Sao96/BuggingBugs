import { controller } from "~/controllers";

const registerPostRoute = [
    ["/register", controller.authorizationController.verifyInfo],
    ["/register", controller.authorizationController.userExists],
    ["/register", controller.authorizationController.createUser],
    ["/register", controller.userController.getUserInfo],
    ["/register", controller.authorizationController.getSession],
];

export { registerPostRoute };
