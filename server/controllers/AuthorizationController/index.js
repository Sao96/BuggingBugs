import { verifyInfo } from "./ControllerMethods/verifyInfo";
import { verifyLoginInfo } from "./ControllerMethods/verifyLoginInfo";
import { userExists } from "./ControllerMethods/userExists";
import { authenticateUser } from "./ControllerMethods/authenticateUser";
import { createUser } from "./ControllerMethods/createUser";
import { getSession } from "./ControllerMethods/getSession";
import { logoutUser } from "./ControllerMethods/logoutUser";
import { checkLoggedIn } from "./ControllerMethods/checkLoggedIn";
import { amILogged } from "./ControllerMethods/amILogged";
import { checkUidsExist } from "./ControllerMethods/checkUidsExist";

const authorizationController = {
    verifyInfo: verifyInfo,
    verifyLoginInfo: verifyLoginInfo,
    userExists: userExists,
    authenticateUser: authenticateUser,
    createUser: createUser,
    getSession: getSession,
    logoutUser: logoutUser,
    checkLoggedIn: checkLoggedIn,
    amILogged: amILogged,
    checkUidsExist: checkUidsExist,
};

export { authorizationController };
