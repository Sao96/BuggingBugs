import mongoose, { mongo } from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function createInvite
 *
 * Expects @req.body.targetIds is set, as well as @requires.body.usersFound
 *
 * If req.body.targetIds.uid  maps to -1 or req.body.to doesn't map to -1, or
 * creators auth level is not 0, an error is thrown.
 */
async function createInvite(req, res, next) {
    const ObjectId = mongoose.Types.ObjectId;
    const from_uid = ObjectId(req.body.userData.uid);
    const from_uid_idx = req.body.targetIds[from_uid];
    const to_uid = ObjectId(req.body.to);
    const pid = ObjectId(req.query.pid);
    if (req.body.targetIds[from_uid] === -1) {
        setError(
            req,
            400,
            "User not found in project.",
            "You do not have permission to invite user."
        );
        return next(req.body.err);
    } else if (req.body.targetIds[to_uid] !== -1) {
        setError(
            req,
            400,
            "User already exists in project.",
            "User already exists in project."
        );
        return next(req.body.err);
    } else if (req.body.usersFound[from_uid_idx].authLevel !== 0) {
        setError(
            req,
            400,
            "Insufficient permission to invite user.",
            "Insufficient ermission to invite user."
        );
        return next(req.body.err);
    }

    try {
        const ProjectInvite = mongoose.model("ProjectInvite");
        const newProjectInvite = new ProjectInvite({
            pid: pid,
            uid: to_uid,
        });

        await newProjectInvite.save();
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    req.body.res.status = 200;
    req.body.res.data = { message: "User successfully invited." };
    next();
}

export { createInvite };
