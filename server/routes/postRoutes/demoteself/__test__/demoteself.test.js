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
import { userExistsInTestProject } from "../../../../util/testing/dbTestController/userExistsInTestProject";

let createdProjects;

test(
    "Connect to DB",
    async () => {
        expect(await createMongooseConnection()).toBe(true);
    },
    DEFAULT_TIMEOUT
);

test(
    "Successful user1",
    async () => {
        testUser1.session = await createNativeTestSession(testUser1);
        expect(testUser1.session !== null).toBe(true);
    },
    DEFAULT_TIMEOUT
);

test(
    "Redirected when not logged in.",
    async () => {
        const res = await fetchRequest(ep.demoteself, "POST");
        expect(res.status).toBe(300);
    },
    DEFAULT_TIMEOUT
);

test(
    "Create test projects from user 1.",
    async () => {
        const newProjects = ["test1"];
        createdProjects = await createTestProjects(testUser1.uid, newProjects);
    },
    DEFAULT_TIMEOUT
);

test(
    "Invalid pid fails",
    async () => {
        let res = await fetchRequest(
            ep.demoteself + "?pid=" + "[123",
            "POST",
            null,
            testUser1.session
        );
        expect(res.status).toBe(400);

        res = await fetchRequest(
            ep.demoteself + "?pid=" + mongoose.Types.ObjectId(),
            "POST",
            null,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Successfully demote self as leader",
    async () => {
        const res = await fetchRequest(
            ep.demoteself + "?pid=" + createdProjects[0]._id,
            "POST",
            null,
            testUser1.session
        );
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "Ensure user1 is demoted",
    async () => {
        const dbResult = await userExistsInTestProject(
            testUser1.uid,
            createdProjects[0]._id
        );
        expect(
            Array.isArray(dbResult) &&
                dbResult.length &&
                dbResult[0].authLevel === 1
        ).toBe(true);
    },
    DEFAULT_TIMEOUT
);

test(
    "Regular member cannot demote self",
    async () => {
        const res = await fetchRequest(
            ep.demoteself + "?pid=" + createdProjects[0]._id,
            "POST",
            null,
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
