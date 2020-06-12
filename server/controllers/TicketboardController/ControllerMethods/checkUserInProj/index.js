import mongoose from "mongoose";
import { setError } from "~/util/setError";

const checkAllfound = (targetIds) => {
    for (let uid in targetIds) {
        if (targetIds[uid] === -1) {
            return false;
        }
    }
    return true;
};

/**
 * @function checkUsersInProj
 * Expects @req.body.usersFound to be a list from @db containing users in
 * the specified project.
 *
 * If @req.body.targetId's is not defined, this function will assume the client is
 * only interested in finding themself and define it.
 *
 * On failure to match all target ID's, execution pipeline is terminated and
 * error is thrown.
 */
async function checkUsersInProj(req, res, next) {
    if (!req.body.targetIds) {
        //we'll always assume at least the client is checking themself
        req.body.targetIds = { [req.body.userData.uid]: -1 };
    }
    req.body.usersFound.forEach((user, idx) => {
        if (user.uid in req.body.targetIds) {
            req.body.targetIds[user.uid] = idx;
        }
    });
    if (!checkAllfound(req.body.targetIds)) {
        setError(
            req,
            400,
            "User not in group",
            "Unauthorized access to project"
        );
        return next(req.body.err);
    }

    next();
}

export { checkUsersInProj };
