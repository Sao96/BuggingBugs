import mongoose from "mongoose";

/**
 * @function userExistsInTestProject
 *
 * @param {String | ObjectId} uid: The uid to search for.
 * @param {String | ObjectId} pid: the pid of the project to search in.
 */
async function userExistsInTestProject(uid, pid) {
    let res;
    try {
        const dbSearch = {
            uid: mongoose.Types.ObjectId(uid),
            pid: mongoose.Types.ObjectId(pid),
        };
        res = await mongoose.model("UserIn").find(dbSearch);
    } catch (err) {
        fail(err);
    }

    return res.length ? res : null;
}

export { userExistsInTestProject };
