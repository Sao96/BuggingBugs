import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function deleteInvite
 * Removes the invite in @db.ProjectInvites with _id @req.body.invId
 */
async function deleteInvite(req, res, next) {
    try {
        const invId = mongoose.Types.ObjectId(req.body.invId);
        await mongoose.model("ProjectInvite").remove({ _id: invId });
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    if (!req.body.res.status) {
        req.body.res.status = 200;
    }
    next();
}

export { deleteInvite };
