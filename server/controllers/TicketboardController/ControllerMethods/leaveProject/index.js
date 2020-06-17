import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function leaveProject
 * Removes from @db.UsersIn the pid matching @req.query.pid and the * uid of @req.body.userData.uid.
 */
function leaveProject(req, res, next) {
    try {
        const pid = mongoose.Types.ObjectId(req.query.pid)
        const uid = mongoose.Types.ObjectId(req.body.userData.uid)
        await mongoose.model("UserIn").remove({ pid: pid, uid: uid })
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    req.body.res.status = 200;
    req.body.res.data = {}
    next();
}
export { leaveProject };
