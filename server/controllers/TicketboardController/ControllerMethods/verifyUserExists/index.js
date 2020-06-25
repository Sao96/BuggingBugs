import mongoose from "mongoose";
import { setError } from "~/util/setError";

async function verifyUserExists(req, res, next) {
    try {
        const uid = mongoose.Types.ObjectId(req.body.userData.uid);
        const pid = mongoose.Types.ObjectId(req.query.pid);
        const dbResult = await mongoose
            .model("UserIn")
            .find({ pid: pid, uid: uid });
        if (dbResult.length === 0) {
            setError(
                req,
                400,
                "User is not admin or not in group.",
                "You do not have permissions for this."
            );
            return next(req.body.err);
        }
        req.body.userData.authLevel = dbResult[0].authLevel;
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.next);
    }

    next();
}

export { verifyUserExists };
