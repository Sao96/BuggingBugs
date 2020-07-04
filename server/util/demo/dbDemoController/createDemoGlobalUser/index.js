import mongoose from "mongoose";

/**
 * @function createDemoGlobalUser
 * @param name {String}
 * @param pfp {String}
 */
async function createDemoGlobalUser(name, pfp) {
    let userData;
    try {
        userData = await mongoose.model("GlobalUser").create({
            name: name,
            pfp: pfp,
            email: "demo@buggingbugs.demo",
        });
    } catch (err) {
        console.log(err);
    }

    return userData;
}

export { createDemoGlobalUser };
