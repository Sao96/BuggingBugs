import mongoose from "mongoose";

/**
 * @function createDemoGlobalUser
 * @param name {String}
 * @param pfp {String}
 */
async function addUsersToDemoProject(users) {
    try {
        await mongoose.model("UserIn").insertMany(users);
    } catch (err) {
        fail(err);
    }
}

export { addUsersToDemoProject };
