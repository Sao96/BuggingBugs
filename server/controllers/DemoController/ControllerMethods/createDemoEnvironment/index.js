import { createDemoGlobalUser } from "~/util/demo/dbDemoController/createDemoGlobalUser";
import { createPiedPiperSample } from "~/util/demo/demosamples/createpiedpipersample";
import { createRipeMediaSample } from "~/util/demo/demosamples/createripemediasample";
import { createInviteSamples } from "~/util/demo/demosamples/createinvitesamples";
// import {createDemoGlobalUser} from "~/util/demo/demosamples

async function createDemoEnvironment(req, res, next) {
    const name = req.body.firstName + " " + req.body.lastName;
    if (req.body.pfp === "") {
        req.body.pfp =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    }
    req.body.userData = await createDemoGlobalUser(name, req.body.pfp);
    req.body.userData.uid = req.body.userData._id;

    await createRipeMediaSample(req.body.userData);
    await createPiedPiperSample(req.body.userData);
    await createInviteSamples(req.body.userData);

    next();
}

export { createDemoEnvironment };
