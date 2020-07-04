import { controller } from "~/controllers";

const createdemoPostRoute = [
    ["/createdemo", controller.demoController.verifyInfo],
    ["/createdemo", controller.demoController.createDemoEnvironment],
    ["/createdemo", controller.userController.getUserInfo],
    ["/createdemo", controller.authorizationController.getSession],
];

export { createdemoPostRoute };
