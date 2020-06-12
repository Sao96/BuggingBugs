import mongoose from "mongoose";
import setError from "~/util/setError";

async function getProjects(req, res, next) {
    const uid = mongoose.Types.ObjectId(req.body.userData.uid);
    try {
        req.body.dbSearch = await mongoose.model("UserIn").aggregate([
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
            return proj.projInfo;
        });

    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    req.body.res.status = 200;
    req.body.res.data = { projects: req.body.dbSearch }
    next()
}

export { getProjects };
