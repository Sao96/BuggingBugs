import { getProjects } from "./ControllerMethods/getProjects";
import { createProject } from "./ControllerMethods/createProject";
import { addUserToProject } from "./ControllerMethods/addUserToProject";
import { getInvites } from "./ControllerMethods/getInvites";
import { checkInviteExists } from "./ControllerMethods/checkInviteExists";
import { deleteInvite } from "./ControllerMethods/deleteInvite";
const projectboardController = {
    getProjects: getProjects,
    createProject: createProject,
    addUserToProject: addUserToProject,
    getInvites: getInvites,
    checkInviteExists: checkInviteExists,
    deleteInvite: deleteInvite,
};

export { projectboardController };
