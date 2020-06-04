import { getProjects } from "./ControllerMethods/getProjects";
import { createProject } from "./ControllerMethods/createProject";
const projectboardController = {
    getProjects: getProjects,
    createProject: createProject,
};

export { projectboardController };
