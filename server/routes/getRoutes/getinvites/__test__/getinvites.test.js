import "babel-polyfill";
import { domain } from "domain.js";
import { fetchRequest } from "fetchRequest";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import {} from "models";
import { createTestProjects } from "createTestProjects";
import { deleteTestInvites } from "deleteTestInvites";
import { createTestInvites } from "createTestInvites";

dotenv.config();
const TIMEOUT = 20000;
const getinvitesEndpoint = domain + "getinvites";
const loginEndpoint = domain + "login";
const testUid1 = process.env.TESTUID1;
const testUid2 = process.env.TESTUID2;

function checkTargetsFound(results, targets) {
    const targetSet = new Set();
    targets.forEach((target) => {
        targetSet.add(String(target.pid));
    });
    let matched = 0;
    results.forEach((result) => {
        matched += targetSet.has(String(result.pid));
    });
    return matched === targets.length;
}

test(
    "Connect to DB",
    async () => {
        await mongoose.connect(process.env.DBURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        expect(true).toBe(true);
    },
    TIMEOUT
);

test(
    "Redirected when not logged in.",
    async () => {
        const res = await fetchRequest(getinvitesEndpoint, "GET");
        expect(res.status).toBe(300);
    },
    TIMEOUT
);

let sessionCookie2;
test(
    "Login & Get Session for user 2",
    async () => {
        const loginInfo = {
            email: process.env.TESTEMAIL2,
            password: process.env.TESTPASSWORD,
            type: "native",
        };
        const loginRes = await fetchRequest(loginEndpoint, "POST", loginInfo);
        sessionCookie2 = loginRes.headers.get("set-cookie");
        expect(loginRes.status).toBe(200);
    },
    TIMEOUT
);

test(
    "Delete any existing invites for user2",
    async () => {
        await deleteTestInvites(testUid2);
    },
    TIMEOUT
);

test(
    "Check if user2 gets a result of no invites.",
    async () => {
        const getInvitesRes = await fetchRequest(
            getinvitesEndpoint,
            "GET",
            null,
            sessionCookie2
        );
        expect(getInvitesRes.status).toBe(200);
        const foundInvites = (await getInvitesRes.json()).invites;
        expect(Array.isArray(foundInvites) && foundInvites.length === 0).toBe(
            true
        );
    },
    TIMEOUT
);

let createdProjects;
test(
    "Create test projects from user 1.",
    async () => {
        const newProjects = ["test1", "test2"];
        createdProjects = await createTestProjects(testUid1, newProjects);
    },
    TIMEOUT
);

let targets;
test(
    "Invite user 2 into both projects.",
    async () => {
        const pids = createdProjects.map((proj) => {
            return proj._id;
        });
        targets = await createTestInvites(testUid2, pids);
    },
    TIMEOUT
);

test(
    "Check if user 2 got all invites.",
    async () => {
        const getInvitesRes = await fetchRequest(
            getinvitesEndpoint,
            "GET",
            null,
            sessionCookie2
        );
        expect(getInvitesRes.status).toBe(200);
        const foundInvites = (await getInvitesRes.json()).invites;
        expect(
            Array.isArray(foundInvites) &&
                foundInvites.length === targets.length
        ).toBe(true);

        expect(checkTargetsFound(foundInvites, targets)).toBe(true);

        await mongoose.connection.close();
    },
    TIMEOUT
);

(async () => {
    if (
        mongoose.connection.readyState === 1 ||
        mongoose.connection.readyState === 2
    ) {
        await mongoose.connection.close();
    }
})();
