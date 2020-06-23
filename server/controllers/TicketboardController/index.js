import { validateTicketFields } from "./ControllerMethods/validateTicketFields";
import { validateInviteFields } from "./ControllerMethods/validateInviteFields";
import { createTicket } from "./ControllerMethods/createTicket";
import { getUsersInProj } from "./ControllerMethods/getUsersInProj";
import { checkUsersInProj } from "./ControllerMethods/checkUserInProj";
import { getTicketsInProj } from "./ControllerMethods/getTicketsInProj";
import { sendProjData } from "./ControllerMethods/sendProjData";
import { updateTicket } from "./ControllerMethods/updateTicket";
import { checkTicketExists } from "./ControllerMethods/checkTicketExists";
import { deleteTicket } from "./ControllerMethods/deleteTicket";
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
import { validateTicketStatusUpdate } from "./ControllerMethods/validateTicketStatusUpdate";
import { updateTicketStatus } from "./ControllerMethods/updateTicketStatus";

const ticketboardController = {
    validateTicketFields: validateTicketFields,
    validateInviteFields: validateInviteFields,
    createTicket: createTicket,
    getUsersInProj: getUsersInProj,
    checkUsersInProj: checkUsersInProj,
    getTicketsInProj: getTicketsInProj,
    sendProjData: sendProjData,
    checkTicketExists: checkTicketExists,
    updateTicket: updateTicket,
    deleteTicket: deleteTicket,
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
    validateTicketStatusUpdate: validateTicketStatusUpdate,
    updateTicketStatus: updateTicketStatus,
};

export { ticketboardController };
