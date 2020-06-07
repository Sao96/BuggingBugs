import mongoose from "mongoose";

const checkAllfound = (targetIds) => {
    for (let uid in targetIds) {
        if (targetIds[uid] === -1) {
            return false;
        }
    }
    return true;
};

async function checkUsersInProj(req, res, next) {
    if (!req.body.targetIds) {
        req.body.targetIds = { [req.body.userData.uid]: -1 };
    }
    req.body.usersFound.forEach((user, idx) => {
        if (user.uid in req.body.targetIds) {
            req.body.targetIds[user.uid] = idx;
        }
    });
    if (!checkAllfound(req.body.targetIds)) {
        req.body.err.status = 400;
        req.body.err.what = "User not in group";
        req.body.err.resmsg = "Unauthorized access to project";
    }
    if (req.body.err.status) {
        res.status(req.body.err.status).send(req.body.err.resmsg);
        return; //need to throw error to log its
    }

    next();
}

export { checkUsersInProj };
