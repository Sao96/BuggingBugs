import { verifyInfo } from "./ControllerMethods/verifyInfo";
import { userExists } from "./ControllerMethods/userExists";
import { authenticateUser } from "./ControllerMethods/authenticateUser";
import { createUser } from "./ControllerMethods/createUser";
import { getSession } from "./ControllerMethods/getSession";
import { getSession } from "mongoose";

const authorizationController = {
    verifyInfo: verifyInfo,
    userExists: userExists,
    authenticateUser: authenticateUser,
    createUser: createUser,
    getSession: getSession,
};

export { authorizationController };
