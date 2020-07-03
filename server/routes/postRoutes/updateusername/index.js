import { controller } from "~/controllers";

const updateusernamePostRoute = [
    ["/updateusername", controller.authorizationController.checkLoggedIn],
    ["/updateusername", controller.userController.updateName],
];

export { updateusernamePostRoute };
