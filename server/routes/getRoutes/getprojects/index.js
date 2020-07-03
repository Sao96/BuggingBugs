import { controller } from "~/controllers";

const getprojectsGetRoute = [
    ["/getprojects", controller.authorizationController.checkLoggedIn],
    ["/getprojects", controller.projectboardController.getProjects],
];

export { getprojectsGetRoute };
