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
import { createTestTicket } from "createTestTicket";
import { addUserToTestProject } from "addUserToTestProject";

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
        const res = await fetchRequest(ep.updateticketstatus, "POST");
        expect(res.status).toBe(300);
    },
    DEFAULT_TIMEOUT
);

test(
    "Check rejection on invalid PID",
    async () => {
        let res = await fetchRequest(
            ep.updateticketstatus,
            "POST",
            null,
            testUser1.session
        );
        expect(res.status).toBe(400);

        res = await fetchRequest(
            ep.updateticketstatus + "?pid=123",
            "POST",
            null,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "User must be in group",
    async () => {
        let res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + mongoose.Types.ObjectId(),
            "POST",
            null,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

let createdProjects;
test(
    "Create test project from user1.",
    async () => {
        const newProjects = ["test1"];
        createdProjects = await createTestProjects(testUser1.uid, newProjects);
    },
    DEFAULT_TIMEOUT
);

test(
    "Valid TID is needed",
    async () => {
        const reqData = { tid: [123] };
        let res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Non-existent TID entered for group",
    async () => {
        const reqData = { tid: mongoose.Types.ObjectId() };
        let res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Add user2 as a regular member to test project",
    async () => {
        await addUserToTestProject(testUser2.uid, createdProjects[0]._id, 1);
    },
    DEFAULT_TIMEOUT
);

let createdTicket;
test(
    "Create a valid ticket",
    async () => {
        createdTicket = await createTestTicket(
            testUser1.uid,
            testUser2.uid,
            createdProjects[0]._id
        );
    },
    DEFAULT_TIMEOUT
);

test(
    "Leader cannot change status from 0 -> 0",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 0 };
        let res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Leader cannot change status from 0 -> 1",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 1 };
        let res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Use API to change ticketstatus to 2",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 2 };
        let res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "Leader cannot change status from 2 -> 2",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 2 };
        let res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Leader cannot change status to an invalid one",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 10 };
        let res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);

        reqData.newTicketStatus = null;
        res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Member cannot change status from 2",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 1 };
        let res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser2.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Leader can change status from 2 -> 0",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 0 };
        let res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "Member can change status from 0 -> 1",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 1 };
        let res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser2.session
        );
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "Member cannot change status from 1 -> not 0",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 2 };
        let res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser2.session
        );
        expect(res.status).toBe(400);

        reqData.newTicketStatus = 5;
        res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser2.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Member can change status from 1 -> 0",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 0 };
        let res = await fetchRequest(
            ep.updateticketstatus + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser2.session
        );
        expect(res.status).toBe(200);

        await mongoose.connection.close();
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
