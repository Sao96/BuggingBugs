import { verifyInfo } from "./ControllerMethods/verifyInfo";
import { createDemoEnvironment } from "./ControllerMethods/createDemoEnvironment";

const demoController = {
    verifyInfo: verifyInfo,
    createDemoEnvironment: createDemoEnvironment,
};

export { demoController };
