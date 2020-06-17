import { validateTicketFields } from "./ControllerMethods/validateTicketFields";
import { validateInviteFields } from "./ControllerMethods/validateInviteFields";
import { createTicket } from "./ControllerMethods/createTicket";
import { getUsersInProj } from "./ControllerMethods/getUsersInProj";
import { checkUsersInProj } from "./ControllerMethods/checkUserInProj";
import { getTicketsInProj } from "./ControllerMethods/getTicketsInProj";
import { sendProjData } from "./ControllerMethods/sendProjData";
import { updateTicket } from "./ControllerMethods/updateTicket";
import { createInvite } from "./ControllerMethods/createInvite";
import { checkPid } from "./ControllerMethods/checkPid";
import { checkAlreadyInvited } from "./ControllerMethods/checkAlreadyInvited";
import { validateProjectName } from "./ControllerMethods/validateProjectName";
import { verifyToIsNotLeader } from "./ControllerMethods/verifyToIsNotLeader";
import { verifyIsLeader } from "./ControllerMethods/verifyIsLeader";
import { renameProject } from "./ControllerMethods/renameProject";
import { removeUser } from "./ControllerMethods/removeUser";
import { promoteUser } from "./ControllerMethods/promoteUser";
import { demoteSelf } from "./ControllerMethods/demoteSelf";
import { verifyUserExists } from "./ControllerMethods/verifyUserExists";
import { leaveProject } from "./ControllerMethods/leaveProject";

const ticketboardController = {
    validateTicketFields: validateTicketFields,
    validateInviteFields: validateInviteFields,
    createTicket: createTicket,
    getUsersInProj: getUsersInProj,
    checkUsersInProj: checkUsersInProj,
    getTicketsInProj: getTicketsInProj,
    sendProjData: sendProjData,
    updateTicket: updateTicket,
    checkPid: checkPid,
    createInvite: createInvite,
    checkAlreadyInvited: checkAlreadyInvited,
    validateProjectName: validateProjectName,
    verifyToIsNotLeader: verifyToIsNotLeader,
    verifyIsLeader: verifyIsLeader,
    renameProject: renameProject,
    removeUser: removeUser,
    promoteUser: promoteUser,
    demoteSelf: demoteSelf,
    verifyUserExists: verifyUserExists,
    leaveProject: leaveProject,
};

export { ticketboardController };
