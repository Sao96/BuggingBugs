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

//missing a pid, to be added mid test
const validTicket = {
    from: mongoose.Types.ObjectId(testUser1.uid),
    to: mongoose.Types.ObjectId(testUser2.uid),
    priority: 1,
    due: "2021-06-06",
    environment: "Windows 10; React",
    tags: "React, Javascript",
    headline: "A brand new test ticket",
    summary: "Here is a brand new ticket to test with.",
};
let createdProjects;

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
        const res = await fetchRequest(ep.createticket, "POST");
        expect(res.status).toBe(300);
    },
    DEFAULT_TIMEOUT
);

test(
    "Create test project from user 1.",
    async () => {
        const newProjects = ["test1"];
        createdProjects = await createTestProjects(testUser1.uid, newProjects);
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
    "Cannot enter an invalid to UID",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0];

        ticketInfo.to = 43;
        const res = await fetchRequest(
            ep.createticket,
            "POST",
            ticketInfo,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Cannot enter an invalid due date",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0];

        ticketInfo.due = "05-02-2014";
        const res = await fetchRequest(
            ep.createticket,
            "POST",
            ticketInfo,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Cannot enter an invalid environment",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0];

        ticketInfo.environment = 53;
        const res = await fetchRequest(
            ep.createticket,
            "POST",
            ticketInfo,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Cannot enter invalid tags",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0];

        ticketInfo.tags = 53;
        const res = await fetchRequest(
            ep.createticket,
            "POST",
            ticketInfo,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Cannot enter an invalid headline",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0];

        ticketInfo.headline = 53;
        const res = await fetchRequest(
            ep.createticket,
            "POST",
            ticketInfo,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Cannot enter an invalid summary",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0];

        ticketInfo.headline = 53;
        const res = await fetchRequest(
            ep.createticket,
            "POST",
            ticketInfo,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Can create a valid ticket",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        const res = await fetchRequest(
            ep.createticket + "?pid=" + ticketInfo.pid,
            "POST",
            ticketInfo,
            testUser1.session
        );
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "Non-leader cannot create a ticket",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        [ticketInfo.from, ticketInfo.to] = [ticketInfo.to, ticketInfo.from];
        const res = await fetchRequest(
            ep.createticket + "?pid=" + ticketInfo.pid,
            "POST",
            ticketInfo,
            testUser2.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "From recipient must be in group",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        ticketInfo.to = mongoose.Types.ObjectId();
        const res = await fetchRequest(
            ep.createticket + "?pid=" + mongoose.Types.ObjectId(),
            "POST",
            ticketInfo,
            testUser2.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "To recipient must be in group",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        ticketInfo.to = mongoose.Types.ObjectId();
        const res = await fetchRequest(
            ep.createticket + "?pid=" + ticketInfo.pid,
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
