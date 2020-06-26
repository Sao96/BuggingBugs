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
import { userExistsInTestProject } from "userExistsInTestProject";
import { createTestProjects } from "createTestProjects";
import { addUserToTestProject } from "addUserToTestProject";

let createdProjects;
const fakeUserUid = mongoose.Types.ObjectId();

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
        const res = await fetchRequest(ep.removeuser, "POST");
        expect(res.status).toBe(300);
    },
    DEFAULT_TIMEOUT
);

test(
    "Create test project from user1.",
    async () => {
        const newProjects = ["test1"];
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
    "Add fake user to project as a member",
    async () => {
        await addUserToTestProject(fakeUserUid, createdProjects[0]._id, 1);
    },
    DEFAULT_TIMEOUT
);

test(
    "Check if user2 is in project",
    async () => {
        expect(
            Array.isArray(
                await userExistsInTestProject(
                    testUser2.uid,
                    createdProjects[0]._id
                )
            )
        ).toBe(true);
    },
    DEFAULT_TIMEOUT
);

test(
    "Invalid pid fails",
    async () => {
        let reqData = { to: testUser2.uid };
        let res = await fetchRequest(
            ep.removeuser + "?pid=" + "[123",
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);

        res = await fetchRequest(
            ep.removeuser + "?pid=" + mongoose.Types.ObjectId(),
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Non-leader cannot remove another user.",
    async () => {
        let reqData = { to: fakeUserUid };
        let res = await fetchRequest(
            ep.removeuser + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser2.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Leader can remove a valid entry",
    async () => {
        let reqData = { to: testUser2.uid };
        let res = await fetchRequest(
            ep.removeuser + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "Check if user2 is not in project",
    async () => {
        expect(
            await userExistsInTestProject(testUser2.uid, createdProjects[0]._id)
        ).toBe(null);
    },
    DEFAULT_TIMEOUT
);

test(
    "Add user2 to project as a leader",
    async () => {
        await addUserToTestProject(testUser2.uid, createdProjects[0]._id, 0);
    },
    DEFAULT_TIMEOUT
);

test(
    "Leader cannot remove another leader",
    async () => {
        let reqData = { to: testUser2.uid };
        let res = await fetchRequest(
            ep.removeuser + "?pid=" + createdProjects[0]._id,
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
