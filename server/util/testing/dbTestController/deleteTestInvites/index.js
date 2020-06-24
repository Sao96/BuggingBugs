import mongoose from "mongoose";
import {} from "models";

/**
 * @function deleteTestInvites
 * Removes from @db any invite to @param uid
 * @param {String | ObjectId} uid: The uid to delete all invites of.
 *
 */
async function deleteTestInvites(uid) {
    try {
        await mongoose.model("ProjectInvite").deleteMany({ uid: uid });
    } catch (err) {
        fail(err);
    }
}

export { deleteTestInvites };
