// import { setTargetIds } from "./ControllerMethods/setTargetIds";
import { updateName } from "./ControllerMethods/updateName";
import { updatePassword } from "./ControllerMethods/updatePassword";
import { getUserInfo } from "./ControllerMethods/getUserInfo";
import { updatePfp } from "./ControllerMethods/updatePfp";

const userController = {
    updateName: updateName,
    updatePfp: updatePfp,
    updatePassword: updatePassword,
    getUserInfo: getUserInfo,
};

export { userController };
