import mongoose from "mongoose";

const validProjectName = (projName) => {
    return projName && typeof projName === "string" && projName.length > 0;
};

async function createProject(req, res, next) {
    req.body.userData.uid = req.session.uid;
    if (!req.body.userData.uid) {
        res.status(300).redirect("/login");
        return false;
        //log this later
    } else if (!validProjectName(req.body.projectName)) {
        req.body.err.status = 400;
        req.body.err.what = "Bad or Missing Project Name";
        req.body.err.what = "Please enter a valid project name.";
        return false;
    }
    const Project = mongoose.model("Project");
    const newProject = new Project({
        name: req.body.projectName,
    });
    req.body.projUserLevel;
    try {
        const newProj = await newProject.save();
        req.body.projectId = newProj._id;
        req.body.projUserLevel = 0;
    } catch (err) {
        req.body.err.status = 500;
        req.body.err.what = err;
        req.body.err.resmsg = "An internal error has occured.";
        return;
    }

    next();
}

export { createProject };
