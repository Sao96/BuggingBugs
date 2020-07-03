import { controller } from "~/controllers";
const updatepasswordPostRoute = [
    ["/updatepassword", controller.authorizationController.checkLoggedIn],
    ["/updatepassword", controller.userController.updatePassword],
];

export { updatepasswordPostRoute };
