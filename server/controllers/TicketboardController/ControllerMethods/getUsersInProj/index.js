import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function checkUsersInProj
 * Expects all req params accessed to already be verified.
 *
 * On success sets @req.body.usersFound to the result of the @db.UsersIn search
 * looking for all of the user info of users in a specific project.
 */
async function getUsersInProj(req, res, next) {
    const pid = mongoose.Types.ObjectId(req.query.pid);
    if (!req.body.err.status) {
        try {
            const UsersIn = mongoose.model("UserIn");
            req.body.usersFound = await UsersIn.aggregate([
                {
                    $match: {
                        pid: pid,
                    },
                },
                {
                    $lookup: {
                        from: "GlobalUsers",
                        localField: "uid",
                        foreignField: "_id",
                        as: "userInfo",
                    },
                },
                { $unwind: { path: "$userInfo" } },
                { $project: { uid: true, authLevel: true, userInfo: true } },
            ]);
        } catch (err) {
            setError(req, 500, err, "An internal error has occured.");
            return next(req.body.err);
        }
    }

    next();
}

export { getUsersInProj };
