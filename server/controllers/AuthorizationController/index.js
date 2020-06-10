import { verifyInfo } from "./ControllerMethods/verifyInfo";
import { userExists } from "./ControllerMethods/userExists";
import { authenticateUser } from "./ControllerMethods/authenticateUser";
import { createUser } from "./ControllerMethods/createUser";
import { getSession } from "./ControllerMethods/getSession";
import { logoutUser } from "./ControllerMethods/logoutUser";
import { checkLoggedIn } from "./ControllerMethods/checkLoggedIn";
import { amILogged } from "./ControllerMethods/amILogged";

const authorizationController = {
    verifyInfo: verifyInfo,
    userExists: userExists,
    authenticateUser: authenticateUser,
    createUser: createUser,
    getSession: getSession,
    logoutUser: logoutUser,
    checkLoggedIn: checkLoggedIn,
    amILogged: amILogged,
};

export { authorizationController };
