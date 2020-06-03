import addGlobalUser from "./addUserToTable/AddGlobalUser";
import addNativeUser from "./addUserToTable/AddNativeUser";
import addGoogleUser from "./addUserToTable/AddNativeUser";

function createUser(req, res){
    await addGlobalUser(req);
    switch(req.body.type){
        case "native":
            addNativeUser(req);
            break;
        case "google":
            addGoogleUser(req);
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

    res.status(200).send("User Created")
    req.completed = true;
}