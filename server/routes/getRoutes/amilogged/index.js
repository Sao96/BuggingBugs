import { controller } from "~/controllers";

const amiloggedGetRoute = [
    ["/amilogged", controller.authorizationController.amILogged],
];

export { amiloggedGetRoute };
