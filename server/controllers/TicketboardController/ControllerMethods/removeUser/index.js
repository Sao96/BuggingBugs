import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function removeUser
 * Removes from @db.UsersIn the pid matching @req.query.pid and the * uid of @req.body.to.
 */
async function removeUser(req, res, next) {
    if (String(req.body.userData.uid) === String(req.body.to)) {
        setError(
            400,
            "Cannot remove self through remove user.",
            "Please remove yourself using the leave option."
        );
    }
    try {
        const pid = mongoose.Types.ObjectId(req.query.pid);
        const to_uid = mongoose.Types.ObjectId(req.body.to);
        await mongoose.model("UserIn").remove({ pid: pid, uid: to_uid });
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    req.body.res.status = 200;
    req.body.res.data = {};
    next();
}
export { removeUser };
