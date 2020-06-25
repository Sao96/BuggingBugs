import "babel-polyfill";
import { domain } from "domain.js";
import { fetchRequest } from "fetchRequest";
import dotenv from "dotenv";
import mongoose, { Mongoose } from "mongoose";
import {} from "models";
import { deleteTestProjects } from "deleteTestProjects";
import { createTestProjects } from "createTestProjects";
import { deleteTestInvites } from "deleteTestInvites";

dotenv.config();
const TIMEOUT = 30000;
const loginEndpoint = domain + "login";
const getInvitesEndpoint = domain + "getinvites";
const createInviteEndpoint = domain + "createinvite";
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
        const res = await fetchRequest(createInviteEndpoint, "POST");
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

test(
    "Delete any existing invites for user2",
    async () => {
        await deleteTestInvites(testUid2);
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
    "Invalid to recipient fails (Value, non-existent)",
    async () => {
        let reqData = { to: 321 };
        let res = await fetchRequest(
            createInviteEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);

        reqData.to = mongoose.Types.ObjectId();
        res = await fetchRequest(
            createInviteEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Invalid pid fails",
    async () => {
        let reqData = { to: testUid2 };
        let res = await fetchRequest(
            createInviteEndpoint + "?pid=" + "[123",
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);

        res = await fetchRequest(
            createInviteEndpoint + "?pid=" + mongoose.Types.ObjectId(),
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Invalid to recipient fails (Value, non-existent)",
    async () => {
        let reqData = { to: 321 };
        let res = await fetchRequest(
            createInviteEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);

        reqData.to = mongoose.Types.ObjectId();
        res = await fetchRequest(
            createInviteEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "user1q successfully invites user2 to testproject",
    async () => {
        let reqData = { to: testUid2 };
        let res = await fetchRequest(
            createInviteEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(200);
    },
    TIMEOUT
);

test(
    "User2 finds invite",
    async () => {
        let reqData = { to: testUid2 };
        let res = await fetchRequest(
            getInvitesEndpoint,
            "GET",
            null,
            sessionCookie2
        );
        expect(res.status).toBe(200);
        const invites = (await res.json()).invites;
        expect(
            invites.length === 1 &&
                String(invites[0].pid) === String(createdProjects[0]._id)
        ).toBe(true);

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
