import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function addUserToProject
 * Expects @req.body.userData.uid; @req.body.projectId; and
 * req.body.projUserLevel to be well defined UID's (strings or ObjectID form)
 *
 * On success adds user to to db.UsersIn with the corresponding project.
 */
async function addUserToProject(req, res, next) {
    const userIn = mongoose.model("UserIn");
    const newUserIn = new userIn({
        uid: req.body.userData.uid,
        pid: req.body.projectId,
        authLevel: req.body.projUserLevel,
    });
    try {
        await newUserIn.save();
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    req.body.res.status = 200;
    req.body.res.data = {};
    next();
}

export { addUserToProject };
