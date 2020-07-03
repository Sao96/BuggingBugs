import { controller } from "~/controllers";

const createprojectPostRoute = [
    ["/createproject", controller.authorizationController.checkLoggedIn],
    ["/createproject", controller.projectboardController.createProject],
    ["/createproject", controller.projectboardController.addUserToProject],
];

export { createprojectPostRoute };
