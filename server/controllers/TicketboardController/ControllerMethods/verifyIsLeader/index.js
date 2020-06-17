import mongoose from "mongoose";
import setError from "~/util/setError";

/**
 * @function verifyIsLeader
 * Checks @db.UsersIn and looks for @req.body.uid to have an authlevel of 0
 * in a match of pid @req.query.pid
 *
 * Sets error if such condition doesn't exist.
 */
async function verifyIsLeader(req, res, next) {
    try {
        const uid = mongoose.Types.ObjectId(req.body.userData.uid);
        const pid = mongoose.Types.ObjectId(req.query.pid);
        const exists = await mongoose
            .model("UserIn")
            .exists({ pid: pid, uid: uid });
        if (!exists) {
            setError(
                req,
                400,
                "User is not admin or not in group.",
                "You do not have permissions for this."
            );
            return next(req.body.err);
        }
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.next);
    }
}

export { verifyIsLeader };
