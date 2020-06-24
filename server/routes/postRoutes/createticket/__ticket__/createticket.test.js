import "babel-polyfill";
import { domain } from "domain.js";
import { fetchRequest } from "fetchRequest";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import {} from "models";
import { createTestProjects } from "createTestProjects";
import { addUserToTestProject } from "addUserToTestProject";

dotenv.config();
const TIMEOUT = 20000;
const loginEndpoint = domain + "login";
const createTicketEndpoint = domain + "createticket";
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
        const res = await fetchRequest(createTicketEndpoint, "POST");
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
    "Login & Get Session for user1",
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
        const newProjects = ["test1"];
        createdProjects = await createTestProjects(testUid1, newProjects);
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
    "Cannot enter an invalid to UID",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0];

        ticketInfo.to = 43;
        const res = await fetchRequest(
            createTicketEndpoint,
            "POST",
            ticketInfo,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Cannot enter an invalid due date",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0];

        ticketInfo.due = "05-02-2014";
        const res = await fetchRequest(
            createTicketEndpoint,
            "POST",
            ticketInfo,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Cannot enter an invalid environment",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0];

        ticketInfo.environment = 53;
        const res = await fetchRequest(
            createTicketEndpoint,
            "POST",
            ticketInfo,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Cannot enter invalid tags",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0];

        ticketInfo.tags = 53;
        const res = await fetchRequest(
            createTicketEndpoint,
            "POST",
            ticketInfo,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Cannot enter an invalid headline",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0];

        ticketInfo.headline = 53;
        const res = await fetchRequest(
            createTicketEndpoint,
            "POST",
            ticketInfo,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Cannot enter an invalid summary",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0];

        ticketInfo.headline = 53;
        const res = await fetchRequest(
            createTicketEndpoint,
            "POST",
            ticketInfo,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Can create a valid ticket",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        const res = await fetchRequest(
            createTicketEndpoint + "?pid=" + ticketInfo.pid,
            "POST",
            ticketInfo,
            sessionCookie1
        );
        expect(res.status).toBe(200);
    },
    TIMEOUT
);

test(
    "Non-leader cannot create a ticket",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        [ticketInfo.from, ticketInfo.to] = [ticketInfo.to, ticketInfo.from];
        const res = await fetchRequest(
            createTicketEndpoint + "?pid=" + ticketInfo.pid,
            "POST",
            ticketInfo,
            sessionCookie2
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "From recipient must be in group",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        ticketInfo.to = mongoose.Types.ObjectId();
        const res = await fetchRequest(
            createTicketEndpoint + "?pid=" + mongoose.Types.ObjectId(),
            "POST",
            ticketInfo,
            sessionCookie2
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "To recipient must be in group",
    async () => {
        let ticketInfo = { ...validTicket };
        ticketInfo.pid = createdProjects[0]._id;
        ticketInfo.to = mongoose.Types.ObjectId();
        const res = await fetchRequest(
            createTicketEndpoint + "?pid=" + ticketInfo.pid,
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
