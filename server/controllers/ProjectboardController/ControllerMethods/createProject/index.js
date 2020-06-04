import mongoose from "mongoose";

const validProjectName = (projName) => {
    return projName && typeof projName === "string" && projName.length > 0;
};

async function getProjects(req, res) {
    if (!req.session.uid) {
        //probably log the fact this got redirected
        res.status(300).redirect("/login");
        return false;
    } else if (!validProjectName(req.body.projectName)) {
        req.body.err.status(400);
        req.body.err.what = "Bad or Missing Project Name";
        req.body.err.what = "Please enter a valid project name.";
        return false;
    }
    const Project = mongoose.model("Project");
    const newProject = new Project({
        name: req.body.projectName,
    });

    try {
        newProject.save();
    } catch (err) {
        req.body.err.status = 500;
        req.body.err.what = err;
        req.body.err.resmsg = "An internal error has occured.";
    }

    next();
}

export { getProjects };
