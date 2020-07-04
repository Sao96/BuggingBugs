import mongoose from "mongoose";

/**
 * @function inviteUserToProject
 *
 * @param {*} uid
 * @param {*} pid
 */
async function inviteUserToProject(uid, pid) {
    let invData;
    try {
        invData = await mongoose
            .model("ProjectInvite")
            .create({ uid: uid, pid: pid });
    } catch (err) {
        console.log(err);
    }

    return invData;
}

export { inviteUserToProject };
