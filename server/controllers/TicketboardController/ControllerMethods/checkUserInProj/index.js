import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function checkUsersInProj
 * Expects @req.body.usersFound to be a list from @db containing users in
 * the specified project.
 *
 * If @req.body.targetId's is not defined, this function will assume the client is
 * only interested in finding themself and define it.
 *
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

    next();
}

export { checkUsersInProj };
