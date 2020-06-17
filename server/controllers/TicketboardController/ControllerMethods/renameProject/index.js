import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function renameProject
 * Updates @db.Projects.name into @req.body.projName.
 */
async function renameProject(req, body, next) {
    try {
        const pid = mongoose.Types.ObjectId(req.query.pid);
        await mongoose
            .model("Projects")
            .update({ _id: pid }, { $set: { name: projName } });
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
    }

    req.body.res.status = 200;
    req.body.res.data = {};

    next();
}

export { renameProject };
