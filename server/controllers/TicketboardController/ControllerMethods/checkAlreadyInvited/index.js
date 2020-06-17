import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function checkAlreadyInvited
 *
 * Checks to see if an invite to @req.body.to for @req.query.pid already exists
 * and sets an error, terminating the query if so
 */
async function checkAlreadyInvited(req, body, next) {
    try {
        const toUid = mongoose.Types.ObjectId(req.body.to);
        const pid = mongoose.Types.ObjectId(req.query.pid);
        const exists = await mongoose
            .model("ProjectInvite")
            .exists({ uid: toUid, pid: pid });
        if (exists) {
            setError(
                req,
                400,
                "An invite to user already exists.",
                "An invite to user already exists."
            );
            return next(req.body.err);
        }
    } catch (err) {
        setError(
            req,
            500,
            "An internal error has occured.",
            "An internal error has occured."
        );
        return next(req.body.err);
    }

    next();
}

export { checkAlreadyInvited };
