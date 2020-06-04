import Mongoose from "mongoose";

async function getProjects(req, res) {
    if (!req.session.uid) {
        //probably log the fact this got redirected
        res.status(300).redirect("/login");
        return;
    }
    console.log("soldier side", typeof req.session.uid);
    const filter = {
        uid: req.session.uid,
    };
    try {
        console.log("soldier side2");
        req.body.dbSearch = await Mongoose.model("Project").find(filter);
        console.log("soldier side3");
        console.log(req.body.dbSearch);
        res.status(200).send(
            JSON.stringify({
                projects: req.body.dbSearch,
            })
        );
    } catch (err) {
        console.log(err);
        req.body.err.status = 500;
        req.body.err.what = err;
        req.body.err.resmsg = "An internal error has occured.";
    }
}

export { getProjects };
