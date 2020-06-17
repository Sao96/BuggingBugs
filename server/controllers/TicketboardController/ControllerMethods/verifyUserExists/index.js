import mongoose from "mongoose";
import setError from "~/util/setError";

async function verifyUserExists(req, res, next) {
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

    next();
}

export { verifyUserExists };
