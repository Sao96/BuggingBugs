import { nativeAuthenticator } from "./Authenticators/nativeAuthenticator";
import { googleAuthenticator } from "./Authenticators/googleAuthenticator";
import { setError } from "~/util/setError";

/**
 * @function authenticateUser
 * Expects @req.body.dbSearch to be a defined search result from DB.
 * Expects @req.body.type to be well defined.
 *
 * On success sets @req.body.userData.uid in ObjectID type.
 */
function authenticateUser(req, res, next) {
    if (req.body.dbSearch.length === 0) {
        setError(
            400,
            "User does not exist in Database",
            "No user found with these credentials."
        );
        return next(req.body.err);
    }
    switch (req.body.type) {
        case "native":
            if (!nativeAuthenticator(req)) {
                return next(req.body.error);
            }
            break;
        case "google":
            if (!googleAuthenticator(req)) {
                return next(req.body.error);
            }
            break;
        default:
            setErrror(
                req,
                500,
                "Internal issue @authenticateUser checking req type",
                "An internal error occured."
            );
            return next(req.body.err.what);
    }

    next();
}

export { authenticateUser };
