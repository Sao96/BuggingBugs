import mongoose from "mongoose";
import { setErrror } from "~/util/setError";
import { setError } from "../../../../util/setError";

/**
 *@function getInvites
 * Searches for any invites for @req.body.userData.uid and assigns them to
 * @req.body.res.data as a object contaning invites
 */

async function getInvites(req, res, next) {
    try {
        const uid = mongoose.Types.ObjectId(req.body.userData.uid);
        req.body.dbSearch = await mongoose.model("ProjectInvite").aggregate([
            { $match: { uid: uid } },
            {
                $lookup: {
                    from: "Projects",
                    localField: "pid",
                    foreignField: "_id",
                    as: "projInfo",
                },
            },
            {
                $unwind: { path: "$projInfo" },
            },
        ]);
        req.body.dbSearch = req.body.dbSearch.map((proj) => {
            proj.projInfo.invId = proj._id;
            return proj.projInfo;
        });
    } catch (err) {
        setError(req, 500, err, "An internal error has occured");
        return next(req.body.err);
    }

    req.body.res.status = 200;
    req.body.res.data = { invites: req.body.dbSearch };
    next();
}

export { getInvites };
