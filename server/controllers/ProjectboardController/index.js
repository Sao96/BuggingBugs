import { getProjects } from "./ControllerMethods/getProjects";
import { createProject } from "./ControllerMethods/createProject";
import { addUserToProject } from "./ControllerMethods/addUserToProject";
import { getInvites } from "./ControllerMethods/getInvites";
const projectboardController = {
    getProjects: getProjects,
    createProject: createProject,
    addUserToProject: addUserToProject,
    getInvites: getInvites,
};

export { projectboardController };
