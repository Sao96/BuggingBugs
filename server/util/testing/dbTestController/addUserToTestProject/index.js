import mongoose from "mongoose";

/**
 * @function addUserToTestProject
 * Assumes a mongoose connection has already been created.
 * Creates BuggingBugs temp projects that are set to expire.
 *
 * @param {String | ObjectId} uid: The uid to add.
 * @param {String | ObjectId} pid: The pid of where to add user.
 * @param {Integer} authLevel: The auth level to add the user with.
 *
 */
async function addUserToTestProject(uid, pid, authLevel) {
    try {
        await mongoose.model("UserIn").insertMany([
            {
                uid: mongoose.Types.ObjectId(uid),
                pid: mongoose.Types.ObjectId(pid),
                authLevel: authLevel,
                expireOn: new Date(),
            },
        ]);
    } catch (err) {
        fail(err);
    }
}

export { addUserToTestProject };
