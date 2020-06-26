import "babel-polyfill";
import { fetchRequest } from "fetchRequest";
import { DEFAULT_TIMEOUT } from "timeouts";
import { endpoints as ep } from "endpointUrls";
import { createNativeTestSession } from "createNativeTestSession";
import { testUser1, testUser2 } from "testUsers";
import {
    createMongooseConnection,
    endMongooseConnection,
} from "mongooseConnection";
import { matchDbResults } from "matchDbResults"
import { createTestProjects } from "createTestProjects";
import { deleteTestInvites } from "deleteTestInvites";
import { createTestInvites } from "createTestInvites";

let createdProjects, createdInvites;

test(
    "Connect to DB",
    async () => {
        expect(await createMongooseConnection()).toBe(true);
    },
    DEFAULT_TIMEOUT
);

test(
    "Successful user1, user2 login",
    async () => {
        testUser1.session = await createNativeTestSession(testUser1);
        expect(testUser1.session !== null).toBe(true);
        testUser2.session = await createNativeTestSession(testUser2);
        expect(testUser2.session !== null).toBe(true);
    },
    DEFAULT_TIMEOUT
);

test(
    "Redirected from endpoint when not logged in",
    async () => {
        const res = await fetchRequest(ep.getinvites, "GET");
        expect(res.status).toBe(300);
    },
    DEFAULT_TIMEOUT
);
test(
    "Delete any existing invites for user2",
    async () => {
        await deleteTestInvites(testUser2.uid);
    },
    DEFAULT_TIMEOUT
);

test(
    "Check if user2 gets a result of no invites from endpoint",
    async () => {
        const getInvitesRes = await fetchRequest(
            ep.getinvites,
            "GET",
            null,
            testUser2.session
        );
        expect(getInvitesRes.status).toBe(200);
        const foundInvites = (await getInvitesRes.json()).invites;
        expect(Array.isArray(foundInvites) && foundInvites.length === 0).toBe(
            true
        );
    },
    DEFAULT_TIMEOUT
);

test(
    "Create test projects from user1",
    async () => {
        const newProjects = ["test1", "test2"];
        createdProjects = await createTestProjects(testUser1.uid, newProjects);
    },
    DEFAULT_TIMEOUT
);

test(
    "Invite user 2 into both projects.",
    async () => {
        const pids = createdProjects.map((proj) => {
            return proj._id;
        });
        createdInvites = await createTestInvites(testUser2.uid, pids);
    },
    DEFAULT_TIMEOUT
);

test(
    "Check if user2 got all invites.",
    async () => {
        const getInvitesRes = await fetchRequest(
            ep.getinvites,
            "GET",
            null,
            testUser2.session
        );
        expect(getInvitesRes.status).toBe(200);
        const foundInvites = (await getInvitesRes.json()).invites;
        expect(matchDbResults(foundInvites, createdInvites, "pid", "pid").length).toBe(createdInvites.length)
    },
    DEFAULT_TIMEOUT
);

test(
    "Disconnect from DB",
    async () => {
        expect(await endMongooseConnection()).toBe(true);
    },
    DEFAULT_TIMEOUT
);
