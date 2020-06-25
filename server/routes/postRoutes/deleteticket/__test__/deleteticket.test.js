import "babel-polyfill";
import { domain } from "domain.js";
import { fetchRequest } from "fetchRequest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { } from "models";
import { createTestProjects } from "createTestProjects";
import { createTestTicket } from "createTestTicket";
import { addUserToTestProject } from "addUserToTestProject";

dotenv.config();
const TIMEOUT = 30000;
const loginEndpoint = domain + "login";
const loadProjectEndpoint = domain + "loadproject";
const deleteTicketEndpoint = domain + "deleteticket";
const testEmail1 = process.env.TESTEMAIL1,
    testEmail2 = process.env.TESTEMAIL2;
const testUid1 = process.env.TESTUID1,
    testUid2 = process.env.TESTUID2;
const testPassword = process.env.TESTPASSWORD;

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
        const res = await fetchRequest(deleteTicketEndpoint, "POST");
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

test(
    "Check rejection on invalid PID",
    async () => {
        let res = await fetchRequest(
            deleteTicketEndpoint + "?pid=",
            "POST",
            null,
            sessionCookie1
        );
        expect(res.status).toBe(400);

        res = await fetchRequest(
            deleteTicketEndpoint + "?pid=[123",
            "POST",
            null,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

let createdProjects;
test(
    "Create test project from user1.",
    async () => {
        const newProjects = ["test1"];
        createdProjects = await createTestProjects(testUid1, newProjects);
    },
    TIMEOUT
);

test(
    "Valid TID is needed",
    async () => {
        const reqData = { tid: [123] };
        let res = await fetchRequest(
            deleteTicketEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Non-existent TID entered for group",
    async () => {
        const reqData = { tid: mongoose.Types.ObjectId() };
        let res = await fetchRequest(
            deleteTicketEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
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

let createdTicket;
test(
    "Create a valid ticket",
    async () => {
        createdTicket = await createTestTicket(
            testUid1,
            testUid2,
            createdProjects[0]._id
        );
    },
    TIMEOUT
);

test("Check if ticket is found", async () => {
    const res = await fetchRequest(
        loadProjectEndpoint + "?pid=" + createdProjects[0]._id,
        "GET",
        null,
        sessionCookie2
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
            deleteTicketEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie2
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Leader can delete ticket",
    async () => {
        const reqData = { tid: createdTicket[0]._id };
        let res = await fetchRequest(
            deleteTicketEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(200);
    },
    TIMEOUT
);

test("Check if ticket is gone", async () => {
    const res = await fetchRequest(
        loadProjectEndpoint + "?pid=" + createdProjects[0]._id,
        "GET",
        null,
        sessionCookie2
    );
    expect(res.status).toBe(200);
    const tickets = (await res.json()).tickets;
    expect(tickets.length === 0);

    await mongoose.connection.close();
});

(async () => {
    if (
        mongoose.connection.readyState === 1 ||
        mongoose.connection.readyState === 2
    ) {
        await mongoose.connection.close();
    }
})();
