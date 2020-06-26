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
import { userExistsInTestProject } from "userExistsInTestProject";
import { matchDbResults } from "matchDbResults";

let createdProjects;
let createdInvites;

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
        createdInvites = [(await res.json()).invInfo];
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
            matchDbResults(foundInvites, createdInvites, "invId", "_id").length === createdInvites.length
        ).toBe(true);
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
        let reqData = { invId: createdInvites[0]._id };
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
        expect(matchDbResults(foundInvites, createdInvites, "pid", "_id").length).toBe(0)
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
