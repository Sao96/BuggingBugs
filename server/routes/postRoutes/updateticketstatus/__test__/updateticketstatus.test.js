import "babel-polyfill";
import { domain } from "domain.js";
import { fetchRequest } from "fetchRequest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {} from "models";
import { createTestProjects } from "createTestProjects";
import { createTestTicket } from "createTestTicket";
import { addUserToTestProject } from "addUserToTestProject";

dotenv.config();
const TIMEOUT = 30000;
const loginEndpoint = domain + "login";
const updateTicketStatusEndpoint = domain + "updateticketstatus";
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
        const res = await fetchRequest(updateTicketStatusEndpoint, "POST");
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
            updateTicketStatusEndpoint,
            "POST",
            null,
            sessionCookie1
        );
        expect(res.status).toBe(400);

        res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=123",
            "POST",
            null,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "User must be in group",
    async () => {
        let res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=" + mongoose.Types.ObjectId(),
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
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
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
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
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

test(
    "Leader cannot change status from 0 -> 0",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 0 };
        let res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Leader cannot change status from 0 -> 1",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 1 };
        let res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Use API to change ticketstatus to 2",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 2 };
        let res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(200);
    },
    TIMEOUT
);

test(
    "Leader cannot change status from 2 -> 2",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 2 };
        let res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Leader cannot change status to an invalid one",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 10 };
        let res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);

        reqData.newTicketStatus = null;
        res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Member cannot change status from 2",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 1 };
        let res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie2
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Leader can change status from 2 -> 0",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 0 };
        let res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(200);
    },
    TIMEOUT
);

test(
    "Member can change status from 0 -> 1",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 1 };
        let res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie2
        );
        expect(res.status).toBe(200);
    },
    TIMEOUT
);

test(
    "Member cannot change status from 1 -> not 0",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 2 };
        let res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie2
        );
        expect(res.status).toBe(400);

        reqData.newTicketStatus = 5;
        res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie2
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Member can change status from 1 -> 0",
    async () => {
        const reqData = { tid: createdTicket[0]._id, newTicketStatus: 0 };
        let res = await fetchRequest(
            updateTicketStatusEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie2
        );
        expect(res.status).toBe(200);

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
