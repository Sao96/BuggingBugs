import { validateTicketFields } from "./ControllerMethods/validateTicketFields";
import { createTicket } from "./ControllerMethods/createTicket";
import { getUsersInProj } from "./ControllerMethods/getUsersInProj";
import { checkUsersInProj } from "./ControllerMethods/checkUserInProj";
import { getTicketsInProj } from "./ControllerMethods/getTicketsInProj";
import { sendProjData } from "./ControllerMethods/sendProjData";
import { updateTicket } from "./ControllerMethods/updateTicket";
import { createInvite } from "./ControllerMethods/createInvite";
import { checkPid } from "./ControllerMethods/checkPid";

const ticketboardController = {
    validateTicketFields: validateTicketFields,
    createTicket: createTicket,
    getUsersInProj: getUsersInProj,
    checkUsersInProj: checkUsersInProj,
    getTicketsInProj: getTicketsInProj,
    sendProjData: sendProjData,
    updateTicket: updateTicket,
    checkPid: checkPid,
    createInvite: createInvite
};

export { ticketboardController };
