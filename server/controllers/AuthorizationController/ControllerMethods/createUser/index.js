import { addGlobalUser } from "./addUserToTable/addGlobalUser";
import { addNativeUser } from "./addUserToTable/addNativeUser";
import { addGoogleUser } from "./addUserToTable/addGoogleUser";

async function createUser(req, res, next) {
    if (req.body.dbSearch.length > 0) {
        req.body.err.status = 400;
        req.body.err.what = "User already in database";
        req.body.err.restext = "User already in database";
    } else {
        await addGlobalUser(req);
        switch (req.body.type) {
            case "native":
                await addNativeUser(req);
                break;
            case "google":
                await addGoogleUser(req);
                break;
            default:
            //throw errow
        }
    }
    if (req.body.err.status) {
        res.status(req.body.err.status).send(req.body.err.restext);
        return;
    }

    res.status(200).send("User Created");
    req.completed = true;
}

export { createUser };
