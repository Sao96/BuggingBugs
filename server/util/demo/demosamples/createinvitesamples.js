import { createDemoProject } from "~/util/demo/dbDemoController/createDemoProject";
import { inviteUserToProject } from "~/util/demo/dbDemoController/inviteUserToProject";

/**
 * @function createinvitesamples
 * @param {Object} user fields - uid, name, email
 */
async function createInviteSamples(user) {
    const groupData = [
        [
            "Pizza Planet",
            "https://i.pinimg.com/originals/5c/fa/d3/5cfad3ab05b2a017b81385187c6cc0bc.png",
        ],
        [
            "The Empire",
            "https://www.geekcals.com/wp-content/uploads/2015/08/Imperial-Logo.jpg",
        ],
    ];

    const pids = [];
    for (let idx = 0; idx < groupData.length; ++idx) {
        pids.push(
            (await createDemoProject(groupData[idx][0], groupData[idx][1]))._id
        );
    }
    for (let idx = 0; idx < pids.length; ++idx) {
        await inviteUserToProject(user.uid, pids[idx]);
    }
}

export { createInviteSamples };
