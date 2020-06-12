import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function checkLoggedIn
 * On success sets @req.body.userData.uid in ObjectID type.
 * On failure, redirects user to login.
 */
function checkLoggedIn(req, res, next) {
    const uid = req.session.uid;
    if (uid) {
        req.body.userData.uid = mongoose.Types.ObjectId(uid);
    } else {
        setError(req, 300, "User is not logged in", "Not logged in.");
        return next(req.body.err.what);
    }

    next();
}
export { checkLoggedIn };
