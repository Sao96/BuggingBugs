import { domain } from "domain.js";

const endpointNames = [
    "getprojects",
    "getinvites",
    "loadproject",
    "amilogged",
    "login",
    "logout",
    "register",
    "createticket",
    "updateticket",
    "updateticketstatus",
    "deleteticket",
    "createproject",
    "createinvite",
    "acceptinvite",
    "renameproject",
    "removeuser",
    "promoteuser",
    "demoteself",
    "leaveproject",
];

const endpoints = {};
endpointNames.forEach((name) => {
    endpoints[name] = domain + name;
});
Object.freeze(endpoints);

export { endpoints };
