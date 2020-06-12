import { googleUserChecker } from "./userTableCheckers/googleUserChecker";
import { nativeUserChecker } from "./userTableCheckers/nativeUserChecker";
import { setError } from "~/util/setError";

/**
 * @function userExists
 * Expects @req.body.type to be a well defined type
 *
 * On success sets @req.body.dbSearch to what the DB finds when searching the
 * user.
 */
async function userExists(req, res, next) {
    switch (req.body.type) {
        case "google":
            if (!(await googleUserChecker(req))) {
                return next(req.body.err);
            }
            break;
        case "native":
            if (!(await nativeUserChecker(req))) {
                return next(req.body.err);
            }
            break;
        default:
            setError(
                500,
                "Internal issue @userExists checking req type",
                "An internal error has occured."
            );
            return next(req.body.err);
    }

    next();
}
export { userExists };
