import addGlobalUser from "./addUserToTable/addGlobalUser";
import addNativeUser from "./addUserToTable/addNativeUser";
import addGoogleUser from "./addUserToTable/addNativeUser";

async function createUser(req, res, next) {
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
    if (req.body.err.status) {
        if (req.body.err.status === 500) {
            res.send(500);
        } else {
            res.status(req.body.err.status).send(req.body.err.what);
        }
        return;
    }

    res.status(200).send("User Created");
    req.completed = true;
}

export { createUser };
