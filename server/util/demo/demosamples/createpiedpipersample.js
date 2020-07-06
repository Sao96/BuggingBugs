import { createDemoGlobalUser } from "~/util/demo/dbDemoController/createDemoGlobalUser";
import { createDemoProject } from "~/util/demo/dbDemoController/createDemoProject";
import { addUsersToDemoProject } from "~/util/demo/dbDemoController/addUsersToDemoProject";
import { addTicketsToDemoProject } from "~/util/demo/dbDemoController/addTicketsToDemoProject";

/**
 * @function createPiedPiperSample
 * @param {Object} user fields - uid, name, email
 */
async function createPiedPiperSample(user) {
    const leaders = {
        gilfoyle: {
            name: "Bertram Gilfoyle",
            pfp:
                "https://pbs.twimg.com/profile_images/494308716942876672/9H_LO4ak_400x400.jpeg",
            authLevel: 0,
        },
        dinesh: {
            name: "Dinesh Chugtai",
            pfp: "https://i.imgur.com/KKtXNs2.jpg",
            authLevel: 0,
        },
        richard: {
            name: "Richard Hendricks",
            pfp:
                "https://pbs.twimg.com/profile_images/773151694934847488/g0aE4CJ6_400x400.jpg",
            authLevel: 0,
        },
    };

    const pid = (
        await createDemoProject(
            "Pied Piper",
            "https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/cnyldp4zpgf8wefvwsym"
        )
    )._id;
    for (let name in leaders) {
        leaders[name].uid = (
            await createDemoGlobalUser(leaders[name].name, leaders[name].pfp)
        )._id;
    }

    await addUsersToDemoProject(
        Object.entries(leaders)
            .map(([key, userInfo]) => {
                userInfo.pid = pid;
                return userInfo;
            })
            .concat([{ pid: pid, uid: user.uid, authLevel: 1 }])
    );

    const tickets = [
        {
            pid: pid,
            from: leaders.gilfoyle.uid,
            to: user.uid,
            priority: 0,
            due: "2020-05-10",
            environment:
                "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",
            tags: "Compression, Mobile, iPhone, iOS",
            headline:
                "Compression algorithm causes the iPhone 10 to crash after a recent update.",
            summary: `${user.name}, I'm not sure what Dinesh did to our code, but after his recent commit, there have been several complaints about our algorithm no longer working and crashing users with an iPhone 10. I need you to check this out now.`,
            status: 0,
        },
        {
            pid: pid,
            from: leaders.dinesh.uid,
            to: user.uid,
            priority: 1,
            due: "2020-05-11",
            environment:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
            tags: "Microsoft Edge, CSS, Compatibility",
            headline: "CSS compatibility issues with Microsoft Edge",
            summary:
                "There are multiple instances where the CSS will-change property is used across the codebase but is incompatible with Microsoft Edge.",
            status: 0,
        },
        {
            pid: pid,
            from: leaders.gilfoyle.uid,
            to: user.uid,
            priority: 3,
            due: "2020-05-15",
            environment:
                "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
            tags: "Microsoft Edge, Firefox, CSS, Compatibility",
            headline: "Typos on landing page.",
            summary:
                "Well, it looks like we shouldn't have put Dinesh in charge of the landing page. To no surprise, there are various typos scattered throughout the page that will surely scare our clients off. Take care of these when you can.",
            status: 0,
        },
        {
            pid: pid,
            from: leaders.richard.uid,
            to: user.uid,
            priority: 2,
            due: "2020-05-14",
            environment:
                "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
            tags: "Microsoft Edge, Firefox, CSS, Compatibility",
            headline: "Decimal precision errors in data analysis.",
            summary: `Hey ${user.name}, when you can, take a look at our data analysis for active users this month. Some of the calculations only go up to 3 digits, but they should go up to 5.`,
            status: 0,
        },
    ];

    await addTicketsToDemoProject(tickets);
}

export { createPiedPiperSample };
