import mongoose from "mongoose";
import { setError } from "~/util/setError";
/**
 * @function checkUidsExist
 * Ensures that all uids in @req.body.targetIds exists in DB
 *
 * Upon failure to find all UIDs, an error is set and query terminates.
 */
async function checkUidsExist(req, res, next) {
    try {
        const targetIds = Object.keys(req.body.targetIds);
        const dbResult = await mongoose
            .model("GlobalUser")
            .find({ _id: { $in: targetIds } });
        if (dbResult.length != targetIds.length) {
            setError(
                req,
                400,
                "UID does not exist.",
                "A user with that ID does not exist."
            );
            return next(req.body.err);
        }
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    next();
}

export { checkUidsExist };
