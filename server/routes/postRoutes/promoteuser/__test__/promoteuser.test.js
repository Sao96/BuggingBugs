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
import mongoose from "mongoose";
import { createTestProjects } from "createTestProjects";
import { addUserToTestProject } from "addUserToTestProject";

let createdProjects;
const mockUid = mongoose.Types.ObjectId();

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
    "Redirected when not logged in.",
    async () => {
        const res = await fetchRequest(ep.promoteuser, "POST");
        expect(res.status).toBe(300);
    },
    DEFAULT_TIMEOUT
);

test(
    "Create test projects from user 1.",
    async () => {
        const newProjects = ["test1", "test2"];
        createdProjects = await createTestProjects(testUser1.uid, newProjects);
    },
    DEFAULT_TIMEOUT
);

test(
    "Add user2 to project as a member",
    async () => {
        await addUserToTestProject(testUser2.uid, createdProjects[0]._id, 1);
    },
    DEFAULT_TIMEOUT
);

test(
    "Add a mock user to group",
    async () => {
        await addUserToTestProject(mockUid, createdProjects[0]._id, 1);
    },
    DEFAULT_TIMEOUT
);

test(
    "Invalid pid fails",
    async () => {
        let reqData = { to: testUser2.uid };
        let res = await fetchRequest(
            ep.promoteuser + "?pid=" + "[123",
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);

        res = await fetchRequest(
            ep.promoteuser + "?pid=" + mongoose.Types.ObjectId(),
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Try to promote someone not in group",
    async () => {
        const reqData = { to: mongoose.Types.ObjectId() };
        const res = await fetchRequest(
            ep.promoteuser + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },

    DEFAULT_TIMEOUT
);

test(
    "Non-leader cannot promote another user",
    async () => {
        const reqData = { to: mockUid };
        const res = await fetchRequest(
            ep.promoteuser + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser2.session
        );
        expect(res.status).toBe(400);
    },

    DEFAULT_TIMEOUT
);

test(
    "Successfully promote a regular user as a leader",
    async () => {
        const reqData = { to: testUser2.uid };
        const res = await fetchRequest(
            ep.promoteuser + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "Leader cannot promote another leader",
    async () => {
        const reqData = { to: testUser2.uid };
        const res = await fetchRequest(
            ep.promoteuser + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);
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
