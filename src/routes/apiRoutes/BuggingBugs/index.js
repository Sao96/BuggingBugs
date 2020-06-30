const uri = "/api/";
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
    "declineinvite",
    "renameproject",
    "removeuser",
    "promoteuser",
    "demoteself",
    "leaveproject",
];
const endpoints = {};
endpointNames.forEach((name) => {
    endpoints[name] = uri + name;
});
Object.freeze(endpoints);

export { endpoints };
