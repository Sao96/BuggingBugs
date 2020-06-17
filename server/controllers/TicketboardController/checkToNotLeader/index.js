import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function checkToNotLeader
 * First vieries that @req.body.to is a valid ObjID and if so, the DB is then
 * queries @db.UsersIn for pid matching, uid existing, and authorization not 0.
 */
async function checkToNotLeader(req, body, res) {
    if (!mongoose.Types.ObjectId.isValid(req.body.to)) {
        setError(req, 400, "Invalid selected user.", "Invalid selected user.");
        return next(req.body.err);
    }
    try {
        const pid = mongoose.Types.ObjectId(req.query.pid);
        const uid = mongoose.Types.ObjectId(req.body.userData.uid);
        const exists = mongoose
            .model("UserIn")
            .exists({ pid: pid, uid: uid, authLevel: { $ne: 0 } });
        if (!exists) {
            setError(
                req,
                400,
                "User doesn't exist or is a leader.",
                "User doesn't exist or is a leader."
            );
            return next(req.body.err);
        }
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    next();
}
export { checkToNotLeader };
