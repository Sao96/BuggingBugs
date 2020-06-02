import { getTypeHandler } from "./ControllerMethods/getType";
import { verifyInfo } from "./ControllerMethods/verifyInfo";
import { userExists } from "./ControllerMethods/userExists";
import { getSession } from "./ControllerMethods/getSession";
const authorizationController = {
    getTypeHandler: getTypeHandler,
    verifyInfo: verifyInfo,
    userExists: userExists,
    getSession: getSession,
};

export { authorizationController };
