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

let createdProjects, createdTicket;

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
        const res = await fetchRequest(ep.deleteticket, "POST");
        expect(res.status).toBe(300);
    },
    DEFAULT_TIMEOUT
);

test(
    "Check rejection on invalid PID",
    async () => {
        let res = await fetchRequest(
            ep.deleteticket + "?pid=",
            "POST",
            null,
            testUser1.session
        );
        expect(res.status).toBe(400);

        res = await fetchRequest(
            ep.deleteticket + "?pid=[123",
            "POST",
            null,
            testUser1.session
        );
        expect(res.status).toBe(400);
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
    "Valid TID is needed",
    async () => {
        const reqData = { tid: [123] };
        let res = await fetchRequest(
            ep.deleteticket + "?pid=" + createdProjects[0]._id,
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
            ep.deleteticket + "?pid=" + createdProjects[0]._id,
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

test("Check if ticket is found", async () => {
    const res = await fetchRequest(
        ep.loadproject + "?pid=" + createdProjects[0]._id,
        "GET",
        null,
        testUser2.session
    );
    expect(res.status).toBe(200);
    const tickets = (await res.json()).tickets;
    expect(
        tickets.length === 1 &&
            String(tickets[0]._id) === String(createdTicket[0]._id)
    );
});

test(
    "Regular user cannot delete ticket",
    async () => {
        const reqData = { tid: createdTicket[0]._id };
        let res = await fetchRequest(
            ep.deleteticket + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser2.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Leader can delete ticket",
    async () => {
        const reqData = { tid: createdTicket[0]._id };
        let res = await fetchRequest(
            ep.deleteticket + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test("Check if ticket is gone", async () => {
    const res = await fetchRequest(
        ep.loadproject + "?pid=" + createdProjects[0]._id,
        "GET",
        null,
        testUser2.session
    );
    expect(res.status).toBe(200);
    const tickets = (await res.json()).tickets;
    expect(tickets.length === 0);
});

test(
    "Disconnect from DB",
    async () => {
        expect(await endMongooseConnection()).toBe(true);
    },
    DEFAULT_TIMEOUT
);
