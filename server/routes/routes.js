import { controller } from "../controllers/";

const GETRoutes = [
    ["/getprojects", controller.authorizationController.checkLoggedIn],
    ["/getprojects", controller.projectboardController.getProjects],

    ["/loadproject", controller.authorizationController.checkLoggedIn],
    ["/loadproject", controller.tbController.getUsersInProj],
    ["/loadproject", controller.tbController.checkUsersInProj],
    ["/loadproject", controller.tbController.getTicketsInProj],
    ["/loadproject", controller.tbController.sendProjData],

    ["/amilogged", controller.authorizationController.amILogged],

    // ["/getprojects", controller.authorizationController.checkLoggedIn],
    // ["/getinvites", controller.userDataController.getInvites]
];
const POSTRoutes = [
    ["/login", controller.authorizationController.verifyInfo],
    ["/login", controller.authorizationController.userExists],
    ["/login", controller.authorizationController.authenticateUser],
    ["/login", controller.authorizationController.getSession],

    ["/logout", controller.authorizationController.logoutUser],

    ["/register", controller.authorizationController.verifyInfo],
    ["/register", controller.authorizationController.userExists],
    ["/register", controller.authorizationController.createUser],

    ["/createticket", controller.authorizationController.checkLoggedIn],
    ["/createticket", controller.tbController.validateTicketFields],
    ["/createticket", controller.tbController.getUsersInProj],
    ["/createticket", controller.tbController.checkUsersInProj],
    ["/createticket", controller.tbController.createTicket],

    ["/updateticket", controller.authorizationController.checkLoggedIn],
    ["/updateticket", controller.tbController.validateTicketFields],
    ["/updateticket", controller.tbController.getUsersInProj],
    ["/updateticket", controller.tbController.checkUsersInProj],
    ["/updateticket", controller.tbController.updateTicket],

    ["/createproject", controller.authorizationController.checkLoggedIn],
    ["/createproject", controller.projectboardController.createProject],
    ["/createproject", controller.projectboardController.addUserToProject],

    ["/createinvite", controller.authorizationController.checkLoggedIn],
    ["/createinvite", controller.authorizationController.userIdExists],
    ["/createinvite", controller.tbController.checkPid],
    ["/createinvite", controller.tbController.getUsersInProj],
    ["/createinvite", controller.tbController.checkUsersInProj],
    ["/createinvite", controller.tbController.createInvite],
];

export { GETRoutes, POSTRoutes };
