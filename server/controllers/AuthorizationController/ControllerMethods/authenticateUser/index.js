import { nativeAuthenticator } from "./Authenticators/nativeAuthenticator/nativeAuthenticator";
import { googleAuthenticator } from "./Authenticators/googleAuthenticator";

function authenticateUser(req, res) {
    if (req.body.dbSearch.length === 0) {
        req.body.err.status = 400;
        req.body.err.what = "User does not exist in DB.";
        req.body.err.resmsg =
            "No user with these credentials exists. Please try again.";
    }
    if (!req.body.err.status) {
        switch (req.body.type) {
            case "native":
                nativeAuthenticator();
                break;
            case "google":
                googleAuthenticator();
                break;
            default:
                req.body.err.status = 500;
                req.body.err.what =
                    "Internal issue @authenticateUser checking req type";
                req.body.err.resmsg = "An internal error occured.";
        }
    }

    if (req.body.err.status) {
        res.status(req.body.err.status).send(req.body.err.resmsg);
        return;
    }

    next();
}
