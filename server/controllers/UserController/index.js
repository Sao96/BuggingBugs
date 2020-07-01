// import { setTargetIds } from "./ControllerMethods/setTargetIds";
import { updateName } from "./ControllerMethods/updateName";
import { updatePassword } from "./ControllerMethods/updatePassword";

const userController = {
    updateName: updateName,
    // updatePfp: updatePfp,
    updatePassword: updatePassword,
};

export { userController };
