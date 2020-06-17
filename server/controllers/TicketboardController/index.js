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
import { verifyToIsNotLeader } from "./ControllerMethods/verifyToIsNotLeader";
import { verifyIsLeader } from "./ControllerMethods/verifyIsLeader";
import { removeUser } from "./ControllerMethods/removeUser";
import { promoteUser } from "./ControllerMethods/promoteUser";
import { demoteSelf } from "./ControllerMethods/demoteSelf"
import { leaveProject } from "./ControllerMethods/leaveProject"

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
    removeUser: removeUser,
    promoteUser: promoteUser,
    demoteSelf: demoteSelf,
    leaveProject: leaveProject
};

export { ticketboardController };
