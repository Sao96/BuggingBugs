import Mongoose from "mongoose";

async function getProjects(req, res) {
    if (!req.session.uid) {
        //probably log the fact this got redirected
        res.status(300).redirect("/login");
        return;
    }
    const uid = req.session.uid;
    try {
        req.body.dbSearch = await Mongoose.model("UserIn").aggregate([
            { $match: { uid: uid } },
            {
                $lookup: {
                    from: "Projects",
                    localField: "pid",
                    foreignField: "_id",
                    as: "projInfo",
                },
            },
            { $unwind: { path: "$projInfo" } },
            { $project: { _id: true, projInfo: true } },
        ]);
        req.body.dbSearch = req.body.dbSearch.map((proj) => {
            console.log(proj.projInfo);
            return proj.projInfo;
        });
        res.status(200).send(
            JSON.stringify({
                projects: req.body.dbSearch,
            })
        );
    } catch (err) {
        req.body.err.status = 500;
        req.body.err.what = err;
        req.body.err.resmsg = "An internal error has occured.";
    }
}

export { getProjects };
