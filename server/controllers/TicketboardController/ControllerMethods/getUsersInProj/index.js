import mongoose from "mongoose";

async function getUsersInProj(req, res, next) {
    if (!req.query.pid) {
        req.body.err.status = 500;
        req.body.err.what = "No PID param";
        req.body.err.resmsg = "No project to load";
    } else if (!req.session.uid) {
        res.status(300).redirect("/login");
        return;
    }
    req.query.pid = mongoose.Types.ObjectId(req.query.pid);
    if (!req.body.err.status) {
        try {
            const usersInSearch = {
                pid: req.query.pid,
            };
            const UsersIn = mongoose.model("UserIn");
            req.body.usersFound = await UsersIn.aggregate([
                {
                    $match: {
                        pid: mongoose.Types.ObjectId(req.query.pid),
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
            req.body.err.status = 500;
            req.body.err.what = err;
            req.body.err.resmsg = "An internal error has occured.";
        }
    }
    if (req.body.err.status) {
        res.status(req.body.err).send(req.body.err.resmsg);
        return;
    }

    next();
}

export { getUsersInProj };
