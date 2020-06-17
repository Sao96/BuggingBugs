import mongoose from "mongoose";
import { setError } from "~/util/setError";

async function verifyToIsNotLeader(req, res, next) {
    try {
        const to_uid = mongoose.Types.ObjectId(req.body.to);
        const pid = mongoose.Types.ObjectId(req.query.pid);
        const exists = await mongoose
            .model("UserIn")
            .exists({ pid: pid, uid: to_uid, authLevel: { $gt: 0 } });
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

    next();
}

export { verifyToIsNotLeader };
