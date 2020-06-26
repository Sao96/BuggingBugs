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
import { createTestTicket } from "createTestTicket";

let createdProjects, targetTicket;

const validTicket = {
    from: mongoose.Types.ObjectId(testUser1.uid),
    to: mongoose.Types.ObjectId(testUser2.uid),
    priority: 1,
    due: "2021-06-06",
    environment: "Windows 10; React",
    tags: "React, Javascript",
    headline: "A brand new test ticket",
    summary: "Here is a brand new ticket to test with.",
    status: 0,
};
Object.freeze(validTicket);

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
        const res = await fetchRequest(ep.updateticket, "POST");
        expect(res.status).toBe(300);
    },
    DEFAULT_TIMEOUT
);

test(
    "Create test project from user 1.",
    async () => {
        const newProjects = ["test1", "test2"];
        createdProjects = await createTestProjects(testUser1.uid, newProjects);
    },
    DEFAULT_TIMEOUT
);

test(
    "Create a test ticket from user1 to user2 in test project1",
    async () => {
        targetTicket = await createTestTicket(
            testUser1.uid,
            testUser2.uid,
            createdProjects[0]._id
        );
    },
    DEFAULT_TIMEOUT
);
test(
    "To recipient must be in group",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        ticketInfo.tid = targetTicket[0]._id;
        ticketInfo.to = mongoose.Types.ObjectId();
        const res = await fetchRequest(
            ep.updateticket + "?pid=" + ticketInfo.pid,
            "POST",
            ticketInfo,
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

test(
    "Detect an invalid TID",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.tid = 123;

        let res = await fetchRequest(
            ep.updateticket + "?pid=" + createdProjects[1]._id,
            "POST",
            ticketInfo,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Detect non-existent ticket in test project2",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.tid = targetTicket[0]._id;

        let res = await fetchRequest(
            ep.updateticket + "?pid=" + createdProjects[1]._id,
            "POST",
            ticketInfo,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Can update a valid ticket",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        ticketInfo.tid = targetTicket[0]._id;

        const res = await fetchRequest(
            ep.updateticket + "?pid=" + ticketInfo.pid,
            "POST",
            ticketInfo,
            testUser1.session
        );
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "Non-leader cannot update a ticket",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        ticketInfo.tid = targetTicket[0]._id;
        [ticketInfo.from, ticketInfo.to] = [ticketInfo.to, ticketInfo.from];
        const res = await fetchRequest(
            ep.updateticket + "?pid=" + ticketInfo.pid,
            "POST",
            ticketInfo,
            testUser2.session
        );
        expect(res.status).toBe(400);

        await mongoose.connection.close();
    },
    DEFAULT_TIMEOUT
);

test(
    "From recipient must be in group",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = mongoose.Types.ObjectId();
        ticketInfo.tid = targetTicket[0]._id;
        ticketInfo.to = mongoose.Types.ObjectId();
        const res = await fetchRequest(
            ep.updateticket + "?pid=" + ticketInfo.pid,
            "POST",
            ticketInfo,
            testUser2.session
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
