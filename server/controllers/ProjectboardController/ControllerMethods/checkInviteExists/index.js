import mongoose from "mongoose";
import { setError } from "../../../../util/setError";
/**
 * @function checkInviteExists
 *
 * Checks to see if @req.body.invId is valid, exists in @db.ProjectInvites,
 * and if it belongs to @req.body.userData.uid.
 *
 * On success sets @req.body.projectId to the invite's found pid and
 * @req.body.projUserLevel to 1
 * On failure, sets an error and terminates the query.
 */
async function checkInviteExists(req, body, next) {
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(req.body.invId)) {
        setError(req, 400, "Invalid Invite ID.", "Invalid Invite ID.");
        return next(req.body.err);
    }
    try {
        const invId = ObjectId(req.body.invId);
        const dbData = await mongoose
            .model("ProjectInvite")
            .find({ _id: invId });
        if (
            dbData.length === 0 ||
            String(req.body.userData.uid) !== String(dbData[0].uid)
        ) {
            setError(
                req,
                400,
                "No invite with that ID exists.",
                "No invite with that ID exists."
            );
            return next(req.body.err);
        }
        req.body.projectId = dbData[0].pid;
        req.body.projUserLevel = 1;
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    next();
}

export { checkInviteExists };
