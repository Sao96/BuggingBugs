import mongoose from "mongoose";

/**
 * @function deleteTestUser
 * Removes from @db any invite to @param uid
 * @param {String} email: The email to find and delete
 *
 */
async function deleteTestUser(email) {
    try {
        await mongoose.model("NativeUser").deleteOne({ email: email });
        await mongoose.model("GlobalUser").deleteOne({ email: email });
    } catch (err) {
        fail(err);
    }
}

export { deleteTestUser };
