import { addGlobalUser } from "./addUserToTable/addGlobalUser";
import { addNativeUser } from "./addUserToTable/addNativeUser";
import { addGoogleUser } from "./addUserToTable/addGoogleUser";
import { setError } from "~/util/setError";

/**
 * @function createUser
 * Expects @req.body.dbSearch to be a well defined search result from DB.
 *
 * On success registers user to db.GlobalUsers and db./respective table/
 * and sets
 */
async function createUser(req, res, next) {
    if (req.body.dbSearch.length > 0) {
        setError(req, 400, "User already in database", "User already exists.");
        return next(req.body.err);
    }
    if (!(await addGlobalUser(req))) {
        return next(req.body.err);
    }
    switch (req.body.type) {
        case "native":
            if (!(await addNativeUser(req))) {
                return next(req.body.err);
            }
            break;
        case "google":
            if (!(await addGoogleUser(req))) {
                return next(req.body.err);
            }
            break;
        default:
            setError(
                500,
                "An internal error has occured",
                "An internal error has occured"
            );
            return next(req.body.err);
    }

    req.body.res.status = 200;
    req.body.res.data = { message: "User Created" };

    next();
}

export { createUser };
