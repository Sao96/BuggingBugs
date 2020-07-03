import mongoose from "mongoose";
import { setError } from "~/util/setError";
import isImageUrl from "is-image-url";

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
    if (!validProjectName(req.body.projName)) {
        setError(
            req,
            400,
            "Bad or missing project name.",
            "Please enter a valid project name"
        );
        return next(req.body.err);
    }
    if (
        typeof req.body.img !== "string" ||
        (req.body.img.length > 0 && !isImageUrl(req.body.img))
    ) {
        setError(
            req,
            400,
            "Bad group image",
            "Please enter a valid group image or leave it blank."
        );
        return next(req.body.err);
    }

    if (req.body.img === "") {
        req.body.img =
            "https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png";
    }
    try {
        const Project = mongoose.model("Project");
        const newProject = new Project({
            name: req.body.projName,
            img: req.body.img,
        });
        req.body.newProjData = await newProject.save();
        req.body.projectId = req.body.newProjData._id;
        req.body.projUserLevel = 0;
    } catch (err) {
        setError(req, 500, err, "An internal error has occured");
        return next(req.body.err);
    }

    req.body.res.data = {
        message: "Group successfully created!",
        projInfo: req.body.newProjData,
    };

    next();
}

export { createProject };
