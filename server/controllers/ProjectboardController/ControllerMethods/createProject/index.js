import mongoose from "mongoose";
import { setError } from "~/util/setError";

const validProjectName = (projName) => {
    return projName && typeof projName === "string" && projName.length > 0;
};

/**
 * @function createProject
 * Assumes @req.body.userData.uid, @req.body.projectName are well defined.
 *
 * On success adds user to to db.UsersIn with the corresponding project and sets
 *
 */
async function createProject(req, res, next) {
    if (!validProjectName(req.body.projectName)) {
        setError(
            req,
            400,
            "Bad or Missing project name.",
            "Please enter a valid project name"
        );
        return next(req.body.err);
    }

    try {
        const Project = mongoose.model("Project");
        const newProject = new Project({
            name: req.body.projectName,
        });
        const newProj = await newProject.save();
        req.body.projectId = newProj._id;
        req.body.projUserLevel = 0;
    } catch (err) {
        setError(req, 500, err, "An internal error has occured");
        return next(req.body.err);
    }

    req.body.res.data = { message: "Group successfully created!" };

    next();
}

export { createProject };
