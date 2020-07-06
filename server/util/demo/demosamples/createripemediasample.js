import { createDemoGlobalUser } from "~/util/demo/dbDemoController/createDemoGlobalUser";
import { createDemoProject } from "~/util/demo/dbDemoController/createDemoProject";
import { addUsersToDemoProject } from "~/util/demo/dbDemoController/addUsersToDemoProject";
import { addTicketsToDemoProject } from "~/util/demo/dbDemoController/addTicketsToDemoProject";

/**
 * @function createRipeMediaSample
 * @param {Object} user fields - uid, name, email
 */
async function createRipeMediaSample(user) {
    const members = {
        enrico: {
            name: "Enrico Fermi",
            pfp: "https://i.imgur.com/F91xKa3.jpg",
            authLevel: 1,
        },
        lise: {
            name: "Lise Meitner",
            pfp: "https://i.imgur.com/9GVUtow.png",
            authLevel: 1,
        },
        max: {
            name: "Max Born",
            pfp: "https://i.imgur.com/CAD6mFo.png",
            authLevel: 1,
        },
        polly: {
            name: "Polly Matzinger",
            pfp: "https://i.imgur.com/nGiZcfx.png",
            authLevel: 0,
        },
    };

    const pid = (
        await createDemoProject("Ripe Media", "https://i.imgur.com/lNvNuPI.jpg")
    )._id;
    for (let name in members) {
        members[name].uid = (
            await createDemoGlobalUser(members[name].name, members[name].pfp)
        )._id;
    }

    await addUsersToDemoProject(
        Object.entries(members)
            .map(([key, userInfo]) => {
                userInfo.pid = pid;
                return userInfo;
            })
            .concat([{ pid: pid, uid: user.uid, authLevel: 0 }])
    );

    members.lise.uid;
    members.max.uid;
    const tickets = [
        {
            pid: pid,
            from: user.uid,
            to: members.enrico.uid,
            priority: 0,
            due: "2020-05-10",
            environment:
                "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",
            tags: "Compression, Mobile, iPhone, iOS",
            headline: "Database compromised from SQL injection!",
            summary: `${members.enrico.name}, you need to restore a backup of the database and immediately figure out what vulnerability was.`,
            status: 0,
        },
        {
            pid: pid,
            from: user.uid,
            to: members.enrico.uid,
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
            from: user.uid,
            to: members.lise.uid,
            priority: 3,
            due: "2020-05-15",
            environment:
                "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
            tags: "Microsoft Edge, Firefox, CSS, Compatibility",
            headline: "Typos on landing page.",
            summary:
                "There are various typos and spelling mistakes on the landing page. When you can, please correct them.",
            status: 0,
        },
        {
            pid: pid,
            from: members.lise.uid,
            to: members.max.uid,
            priority: 2,
            due: "2020-05-14",
            environment:
                "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
            tags: "Microsoft Edge, Firefox, CSS, Compatibility",
            headline: "Decimal precision errors in data analysis.",
            summary: `Hey ${members.max.name}, when you can, take a look at our data analysis for active users this month. Some of the calculations only go up to 3 digits, but they should go up to 5.`,
            status: 0,
        },
        {
            pid: pid,
            from: user.uid,
            to: members.enrico.uid,
            priority: 1,
            due: "2020-05-11",
            environment:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
            tags: "Microsoft Edge, CSS, Compatibility",
            headline: "Random app restarts when loading video.",
            summary:
                "It's been reported that the app randomly restarts when loading videos, with seemingly any video.",
            status: 1,
        },
        {
            pid: pid,
            from: user.uid,
            to: members.lise.uid,
            priority: 2,
            due: "2020-05-11",
            environment:
                "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",
            tags: "Microsoft Edge, CSS, Compatibility",
            headline: "Random image flickering.",
            summary:
                "When scrolling down the news feed, images posted randomly start to flicker. The same issue happens when viewing other peoples profiles.",
            status: 1,
        },
        {
            pid: pid,
            from: user.uid,
            to: members.max.uid,
            priority: 3,
            due: "2020-05-14",
            environment:
                "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
            tags: "Microsoft Edge, Firefox, CSS, Compatibility",
            headline: "Incorrect spelling of a word on profile page.",
            summary: `Shouldn't take too long, but on the view profle page, there's a spelling mistake with the word profile where it's spelt as proifle. Patch that up when you find the time.`,
            status: 2,
        },
    ];

    await addTicketsToDemoProject(tickets);
}
export { createRipeMediaSample };
