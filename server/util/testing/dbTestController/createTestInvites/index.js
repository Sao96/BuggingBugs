import mongoose from "mongoose";
import {} from "models";

/**
 * @function createTestInvites
 * Assumes a mongoose connection has already been created.
 * Creates BuggingBugs temp projects that are set to expire.
 *
 * @param {String | ObjectId} uid: The uid of the test account to invite.
 * @param {Array} pids to be an array of pids of the projects to invite user
 * into.
 *
 * @return all ids
 */
async function createTestInvites(uid, pids) {
    let targets;
    try {
        const data = pids.map((pid) => {
            return {
                pid: mongoose.Types.ObjectId(pid),
                uid: mongoose.Types.ObjectId(uid),
                expireOn: new Date(),
            };
        });
        targets = await mongoose.model("ProjectInvite").insertMany(data);
    } catch (err) {
        fail(err);
    }

    return targets;
}

export { createTestInvites };
