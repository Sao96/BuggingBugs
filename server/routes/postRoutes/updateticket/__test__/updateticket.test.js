import "babel-polyfill";
import { domain } from "domain.js";
import { fetchRequest } from "fetchRequest";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import {} from "models";
import { createTestProjects } from "createTestProjects";
import { addUserToTestProject } from "addUserToTestProject";
import { createTestTicket } from "createTestTicket";

dotenv.config();
const TIMEOUT = 40000;
const loginEndpoint = domain + "login";
const updateTicketEndpoint = domain + "updateticket";
const testEmail1 = process.env.TESTEMAIL1,
    testEmail2 = process.env.TESTEMAIL2;
const testUid1 = process.env.TESTUID1,
    testUid2 = process.env.TESTUID2;
const testPassword = process.env.TESTPASSWORD;

//missing a pid, to be added mid test
const validTicket = {
    from: mongoose.Types.ObjectId(testUid1),
    to: mongoose.Types.ObjectId(testUid2),
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
        await mongoose.connect(process.env.DBURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        expect(true).toBe(true);
    },
    TIMEOUT
);

test(
    "Redirected when not logged in.",
    async () => {
        const res = await fetchRequest(updateTicketEndpoint, "POST");
        expect(res.status).toBe(300);
    },
    TIMEOUT
);

let sessionCookie1;
test(
    "Login & Get Session for user1",
    async () => {
        const loginInfo = {
            email: testEmail1,
            password: testPassword,
            type: "native",
        };
        const loginRes = await fetchRequest(loginEndpoint, "POST", loginInfo);
        sessionCookie1 = loginRes.headers.get("set-cookie");
        expect(loginRes.status).toBe(200);
    },
    TIMEOUT
);

let sessionCookie2;
test(
    "Login & Get Session for user2",
    async () => {
        const loginInfo = {
            email: testEmail2,
            password: testPassword,
            type: "native",
        };
        const loginRes = await fetchRequest(loginEndpoint, "POST", loginInfo);
        sessionCookie2 = loginRes.headers.get("set-cookie");
        expect(loginRes.status).toBe(200);
    },
    TIMEOUT
);

let createdProjects;
test(
    "Create test project from user 1.",
    async () => {
        const newProjects = ["test1", "test2"];
        createdProjects = await createTestProjects(testUid1, newProjects);
    },
    TIMEOUT
);

let targetTicket;
test(
    "Create a test ticket from user1 to user2 in test project1",
    async () => {
        targetTicket = await createTestTicket(
            testUid1,
            testUid2,
            createdProjects[0]._id
        );
    },
    TIMEOUT
);
test(
    "To recipient must be in group",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        ticketInfo.tid = targetTicket[0]._id;
        ticketInfo.to = mongoose.Types.ObjectId();
        const res = await fetchRequest(
            updateTicketEndpoint + "?pid=" + ticketInfo.pid,
            "POST",
            ticketInfo,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);
test(
    "Add user2 as a regular member to test project",
    async () => {
        await addUserToTestProject(testUid2, createdProjects[0]._id, 1);
    },
    TIMEOUT
);

test(
    "Detect an invalid TID",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.tid = 123;

        let res = await fetchRequest(
            updateTicketEndpoint + "?pid=" + createdProjects[1]._id,
            "POST",
            ticketInfo,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Detect non-existent ticket in test project2",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.tid = targetTicket[0]._id;

        let res = await fetchRequest(
            updateTicketEndpoint + "?pid=" + createdProjects[1]._id,
            "POST",
            ticketInfo,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Can update a valid ticket",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        ticketInfo.tid = targetTicket[0]._id;

        const res = await fetchRequest(
            updateTicketEndpoint + "?pid=" + ticketInfo.pid,
            "POST",
            ticketInfo,
            sessionCookie1
        );
        expect(res.status).toBe(200);
    },
    TIMEOUT
);

test(
    "Non-leader cannot update a ticket",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        ticketInfo.tid = targetTicket[0]._id;
        [ticketInfo.from, ticketInfo.to] = [ticketInfo.to, ticketInfo.from];
        const res = await fetchRequest(
            updateTicketEndpoint + "?pid=" + ticketInfo.pid,
            "POST",
            ticketInfo,
            sessionCookie2
        );
        expect(res.status).toBe(400);

        await mongoose.connection.close();
    },
    TIMEOUT
);

test(
    "From recipient must be in group",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = mongoose.Types.ObjectId();
        ticketInfo.tid = targetTicket[0]._id;
        ticketInfo.to = mongoose.Types.ObjectId();
        const res = await fetchRequest(
            updateTicketEndpoint + "?pid=" + ticketInfo.pid,
            "POST",
            ticketInfo,
            sessionCookie2
        );
        expect(res.status).toBe(400);

        await mongoose.connection.close();
    },
    TIMEOUT
);

(async () => {
    if (
        mongoose.connection.readyState === 1 ||
        mongoose.connection.readyState === 2
    ) {
        await mongoose.connection.close();
    }
})();
