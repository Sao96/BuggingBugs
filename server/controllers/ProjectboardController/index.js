import { getProjects } from "./ControllerMethods/getProjects";
import { createProject } from "./ControllerMethods/createProject";
import { addUserToProject } from "./ControllerMethods/addUserToProject";
const projectboardController = {
    getProjects: getProjects,
    createProject: createProject,
    addUserToProject: addUserToProject,
};

export { projectboardController };
