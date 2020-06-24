import mongoose from "mongoose";
import {} from "models";

/**
 * @function createTestProjects
 * Assumes a mongoose connection has already been created.
 * Creates BuggingBugs temp projects that are set to expire.
 *
 * @param {String | ObjectId} uid: The uid of the test account.
 * @param {Array} projectsNames to be an array of
 * desired names to create.
 *
 * @return all project documents created.
 */
async function createTestProjects(uid, projectsNames) {
    let targets;
    try {
        const data = projectsNames.map((projName) => {
            return { name: projName, expireOn: new Date() };
        });
        targets = await mongoose.model("Project").insertMany(data);
        await mongoose.model("UserIn").insertMany(
            targets.map((target) => {
                return { uid: uid, pid: target._id, expireOn: new Date() };
            })
        );
    } catch (err) {
        fail(err);
    }

    return targets;
}

export { createTestProjects };
