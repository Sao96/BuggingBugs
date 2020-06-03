import { googleUserChecker } from "./userTableCheckers/googleUserChecker";
import { nativeUserChecker } from "./userTableCheckers/nativeUserChecker";

async function userExists(req, res, next) {
    switch (req.body.type) {
        case "google":
            req.body.userExists = await googleUserChecker(req);
            break;
        case "native":
            req.body.userExists = await nativeUserChecker(req);
            break;
        default:
            req.body.err.status = 500;
            req.body.err.what = "Internal issue @userExists checking req type";
            req.body.err.resmsg = "An internal error has occured.";
    }
    if (req.body.err.status) {
        res.status(req.body.err.status).send(req.body.err.resmsg);
        return;
    }

    next();
}
export { userExists };
