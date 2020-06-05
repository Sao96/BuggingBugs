import { controller } from "../controllers/";

const GETRoutes = [
    ["/gettickets", controller.tbController.getTickets],
    ["/getprojects", controller.projectboardController.getProjects],
];
const POSTRoutes = [
    ["/login", controller.authorizationController.verifyInfo],
    ["/login", controller.authorizationController.userExists],
    ["/login", controller.authorizationController.authenticateUser],
    ["/login", controller.authorizationController.getSession],
    ["/register", controller.authorizationController.verifyInfo],
    ["/register", controller.authorizationController.userExists],
    ["/register", controller.authorizationController.createUser],
    ["/gettickets", controller.tbController.getTickets],
    ["/createproject", controller.projectboardController.createProject],
    ["/createproject", controller.projectboardController.addUserToProject],
];

export { GETRoutes, POSTRoutes };
