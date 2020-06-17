import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function promoteUser
 * Promotes from @db.UsersIn the pid matching @req.query.pid and
 *  the uid of @req.body.userData.uid to a leader.
 */
async function promoteUser(req, res, next) {
    try {
        const pid = mongoose.Types.ObjectId(req.query.pid);
        const to_uid = mongoose.Types.ObjectId(req.body.to);
        await mongoose
            .model("UserIn")
            .update({ pid: pid, uid: to_uid }, { $set: { authLevel: 0 } });
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    req.body.res.status = 200;
    req.body.res.data = {};
    next();
}
export { promoteUser };
