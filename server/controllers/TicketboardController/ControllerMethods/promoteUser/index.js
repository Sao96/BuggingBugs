import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function promoteUser
 * Promotes from @db.UsersIn the pid matching @req.query.pid and 
 *  the uid of @req.body.userData.uid to a leader.
 */
function promoteUser(req, res, next) {
    try {
        const pid = mongoose.Types.ObjectId(req.query.pid)
        const uid = mongoose.Types.ObjectId(req.body.userData.uid)
        await mongoose.model("UserIn").update({ pid: pid, uid: uid }, { $set: { authLevel: 0 } })
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    req.body.res.status = 200;
    req.body.res.data = {}
    next();
}
export { promoteUser };
