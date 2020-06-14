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
import { checkInviteExists } from "./ControllerMethods/checkInviteExists";
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
    checkInviteExists: checkInviteExists,
};

export { ticketboardController };
