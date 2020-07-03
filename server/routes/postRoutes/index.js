import { createticketPostRoute } from "./createticket";
import { createinvitePostRoute } from "./createinvite";
import { renameprojectPostRoute } from "./renameproject";
import { logoutPostRoute } from "./logout";
import { deleteticketPostRoute } from "./deleteticket";
import { acceptinvitePostRoute } from "./acceptinvite";
import { updateticketstatusPostRoute } from "./updateticketstatus";
import { createprojectPostRoute } from "./createproject";
import { loginPostRoute } from "./login";
import { removeuserPostRoute } from "./removeuser";
import { demoteselfPostRoute } from "./demoteself";
import { leaveprojectPostRoute } from "./leaveproject";
import { promoteuserPostRoute } from "./promoteuser";
import { updateticketPostRoute } from "./updateticket";
import { registerPostRoute } from "./register";
import { updateusernamePostRoute } from "./updateusername";
import { updatepasswordPostRoute } from "./updatepassword";
import { updatepfpPostRoute } from "./updatepfp";
import { updategroupimagePostRoute } from "./updategroupimage";

const postRoutesMap = {
    acceptinvitePostRoute: acceptinvitePostRoute,
    deleteticketPostRoute: deleteticketPostRoute,
    renameprojectPostRoute: renameprojectPostRoute,
    updatepfpPostRoute: updatepfpPostRoute,
    demoteselfPostRoute: demoteselfPostRoute,
    updatepasswordPostRoute: updatepasswordPostRoute,
    loginPostRoute: loginPostRoute,
    updateusernamePostRoute: updateusernamePostRoute,
    createinvitePostRoute: createinvitePostRoute,
    logoutPostRoute: logoutPostRoute,
    removeuserPostRoute: removeuserPostRoute,
    leaveprojectPostRoute: leaveprojectPostRoute,
    registerPostRoute: registerPostRoute,
    promoteuserPostRoute: promoteuserPostRoute,
    createticketPostRoute: createticketPostRoute,
    updateticketPostRoute: updateticketPostRoute,
    createprojectPostRoute: createprojectPostRoute,
    updateticketstatusPostRoute: updateticketstatusPostRoute,
    updategroupimagePostRoute: updategroupimagePostRoute,
};

export { postRoutesMap };
