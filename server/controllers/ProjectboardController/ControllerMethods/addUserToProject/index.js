import mongoose from "mongoose";
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
        req.body.err.status = 500;
        req.body.err.what = err;
        req.body.err.resmsg = "An internal error has occured.";
        return;
    }

    res.status(200).send("OK");
}

export { addUserToProject };
