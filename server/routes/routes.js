import { controller } from "../controllers/";

const GETRoutes = [
    ["/getprojects", controller.authorizationController.checkLoggedIn],
    ["/getprojects", controller.projectboardController.getProjects],

    ["/getinvites", controller.authorizationController.checkLoggedIn],
    ["/getinvites", controller.projectboardController.getInvites],

    ["/loadproject", controller.authorizationController.checkLoggedIn],
    ["/loadproject", controller.tbController.checkPid],
    ["/loadproject", controller.tbController.verifyUserExists],
    ["/loadproject", controller.tbController.getUsersInProj],
    ["/loadproject", controller.tbController.getTicketsInProj],
    ["/loadproject", controller.tbController.sendProjData],

    ["/amilogged", controller.authorizationController.amILogged],
];
const POSTRoutes = [
    ["/updateusername", controller.authorizationController.checkLoggedIn],
    ["/updateusername", controller.userController.updateName],

    ["/updatepassword", controller.authorizationController.checkLoggedIn],
    ["/updatepassword", controller.userController.updatePassword],

    ["/updatepfp", controller.authorizationController.checkLoggedIn],
    ["/updatepfp", controller.userController.updatePfp],

    ["/login", controller.authorizationController.verifyLoginInfo],
    ["/login", controller.authorizationController.userExists],
    ["/login", controller.authorizationController.authenticateUser],
    ["/login", controller.userController.getUserInfo],
    ["/login", controller.authorizationController.getSession],

    ["/logout", controller.authorizationController.logoutUser],

    ["/register", controller.authorizationController.verifyInfo],
    ["/register", controller.authorizationController.userExists],
    ["/register", controller.authorizationController.createUser],
    ["/login", controller.userController.getUserInfo],
    ["/register", controller.authorizationController.getSession],

    ["/createticket", controller.authorizationController.checkLoggedIn],
    ["/createticket", controller.tbController.validateTicketFields],
    ["/createticket", controller.tbController.getUsersInProj],
    ["/createticket", controller.tbController.checkUsersInProj],
    ["/createticket", controller.tbController.createTicket],

    ["/updateticket", controller.authorizationController.checkLoggedIn],
    ["/updateticket", controller.tbController.validateTicketFields],
    ["/updateticket", controller.tbController.checkTicketExists],
    ["/updateticket", controller.tbController.getUsersInProj],
    ["/updateticket", controller.tbController.checkUsersInProj],
    ["/updateticket", controller.tbController.updateTicket],

    ["/updateticketstatus", controller.authorizationController.checkLoggedIn],
    ["/updateticketstatus", controller.tbController.checkPid],
    ["/updateticketstatus", controller.tbController.verifyUserExists],
    ["/updateticketstatus", controller.tbController.checkTicketExists],
    ["/updateticketstatus", controller.tbController.validateTicketStatusUpdate],
    ["/updateticketstatus", controller.tbController.updateTicketStatus],

    ["/deleteticket", controller.authorizationController.checkLoggedIn],
    ["/deleteticket", controller.tbController.checkPid],
    ["/deleteticket", controller.tbController.checkTicketExists],
    ["/deleteticket", controller.tbController.verifyIsLeader],
    ["/deleteticket", controller.tbController.deleteTicket],

    ["/createproject", controller.authorizationController.checkLoggedIn],
    ["/createproject", controller.projectboardController.createProject],
    ["/createproject", controller.projectboardController.addUserToProject],

    ["/createinvite", controller.authorizationController.checkLoggedIn],
    ["/createinvite", controller.tbController.validateInviteFields],
    ["/createinvite", controller.tbController.checkPid],
    ["/createinvite", controller.authorizationController.checkUidsExist],
    ["/createinvite", controller.tbController.checkAlreadyInvited],
    ["/createinvite", controller.tbController.getUsersInProj],
    ["/createinvite", controller.tbController.checkUsersInProj],
    ["/createinvite", controller.tbController.createInvite],

    ["/acceptinvite", controller.authorizationController.checkLoggedIn],
    ["/acceptinvite", controller.projectboardController.checkInviteExists],
    ["/acceptinvite", controller.projectboardController.addUserToProject],
    ["/acceptinvite", controller.projectboardController.deleteInvite],

    ["/renameproject", controller.authorizationController.checkLoggedIn],
    ["/renameproject", controller.tbController.validateProjectName],
    ["/renameproject", controller.tbController.checkPid],
    ["/renameproject", controller.tbController.verifyIsLeader],
    ["/renameproject", controller.tbController.renameProject],

    ["/removeuser", controller.authorizationController.checkLoggedIn],
    ["/removeuser", controller.tbController.checkPid],
    ["/removeuser", controller.tbController.verifyIsLeader],
    ["/removeuser", controller.tbController.verifyToIsNotLeader],
    ["/removeuser", controller.tbController.removeUser],

    ["/promoteuser", controller.authorizationController.checkLoggedIn],
    ["/promoteuser", controller.tbController.checkPid],
    ["/promoteuser", controller.tbController.verifyIsLeader],
    ["/promoteuser", controller.tbController.verifyToIsNotLeader],
    ["/promoteuser", controller.tbController.promoteUser],

    ["/demoteself", controller.authorizationController.checkLoggedIn],
    ["/demoteself", controller.tbController.checkPid],
    ["/demoteself", controller.tbController.verifyIsLeader],
    ["/demoteself", controller.tbController.demoteSelf],

    ["/leaveproject", controller.authorizationController.checkLoggedIn],
    ["/leaveproject", controller.tbController.checkPid],
    ["/leaveproject", controller.tbController.verifyUserExists],
    ["/leaveproject", controller.tbController.leaveProject],
];

export { GETRoutes, POSTRoutes };
