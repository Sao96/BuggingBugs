import googleUserChecker from "./userTableCheckers/googleUserChecker";
import nativeUserChecker from "./userTableCheckers/nativeUserChecker";
async function userExists(req, res) {
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
    }

    if (req.body.err.status) {
        if (req.body.err.status === 500) {
            res.send(500);
        } else {
            res.status(req.body.err.status).send(req.body.err.what);
        }
        return;
    }

    next();
}
export { userExists };
