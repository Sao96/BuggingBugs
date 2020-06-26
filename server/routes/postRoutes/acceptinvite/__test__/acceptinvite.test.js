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
import { deleteTestInvites } from "deleteTestInvites";
import { userExistsInTestProject } from "userExistsInTestProject";

let createdProjects;
let createdInvite;

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
        const res = await fetchRequest(ep.acceptinvite, "POST");
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
    "Create test project from user1.",
    async () => {
        const newProjects = ["test1"];
        createdProjects = await createTestProjects(testUser1.uid, newProjects);
    },
    DEFAULT_TIMEOUT
);

test(
    "User1 successfully invites user2 to test project",
    async () => {
        let reqData = { to: testUser2.uid };
        let res = await fetchRequest(
            ep.createinvite + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "User2 finds the invite",
    async () => {
        let res = await fetchRequest(
            ep.getinvites,
            "GET",
            null,
            testUser2.session
        );
        expect(res.status).toBe(200);
        const foundInvites = (await res.json()).invites;
        expect(
            foundInvites.length === 1 &&
                String(foundInvites[0].pid) === String(createdProjects[0]._id)
        ).toBe(true);
        createdInvite = foundInvites[0];
    },
    DEFAULT_TIMEOUT
);

test(
    "User2 tries accepting a bad invite",
    async () => {
        let reqData = { invId: 123 };
        let res = await fetchRequest(
            ep.acceptinvite,
            "POST",
            reqData,
            testUser2.session
        );
        expect(res.status).toBe(400);

        reqData.invId = mongoose.Types.ObjectId();
        res = await fetchRequest(
            ep.acceptinvite,
            "POST",
            reqData,
            testUser2.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "User2 accepts a valid invite",
    async () => {
        let reqData = { invId: createdInvite.invId };
        let res = await fetchRequest(
            ep.acceptinvite,
            "POST",
            reqData,
            testUser2.session
        );
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "User2 has no remaining invites",
    async () => {
        let res = await fetchRequest(
            ep.getinvites,
            "GET",
            null,
            testUser2.session
        );
        expect(res.status).toBe(200);
        const foundInvites = (await res.json()).invites;
        expect(Array.isArray(foundInvites) && foundInvites.length === 0).toBe(
            true
        );
    },
    DEFAULT_TIMEOUT
);

test(
    "User2 found in test project.",
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
    "Disconnect from DB",
    async () => {
        expect(await endMongooseConnection()).toBe(true);
    },
    DEFAULT_TIMEOUT
);
