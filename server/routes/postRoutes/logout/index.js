import { controller } from "~/controllers";

const logoutPostRoute = [
    ["/logout", controller.authorizationController.logoutUser],
];

export { logoutPostRoute };
