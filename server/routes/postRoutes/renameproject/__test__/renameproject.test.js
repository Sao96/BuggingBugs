import "babel-polyfill";
import { domain } from "domain.js";
import { fetchRequest } from "fetchRequest";
import dotenv from "dotenv";
import mongoose, { Mongoose } from "mongoose";
import {} from "models";
import { deleteTestProjects } from "deleteTestProjects";
import { createTestProjects } from "createTestProjects";
import { addUserToTestProject } from "addUserToTestProject";

dotenv.config();
const TIMEOUT = 30000;
const loginEndpoint = domain + "login";
const renameProjectEndpoint = domain + "renameproject";
const getProjectsEndpoint = domain + "getprojects";
const testEmail1 = process.env.TESTEMAIL1,
    testEmail2 = process.env.TESTEMAIL2;
const testUid1 = process.env.TESTUID1,
    testUid2 = process.env.TESTUID2;
const testPassword = process.env.TESTPASSWORD;
const renameName = "Renamed";

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
        const res = await fetchRequest(renameProjectEndpoint, "POST");
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
    "Delete user1's test projects",
    async () => {
        await deleteTestProjects(testUid1);
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
    "Add user2 into test project.",
    async () => {
        await addUserToTestProject(testUid2, createdProjects[0]._id, 1);
    },
    TIMEOUT
);

test(
    "Reject invalid project name",
    async () => {
        const reqData = {
            projName: 123,
        };
        let res = await fetchRequest(
            renameProjectEndpoint,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);

        reqData.projName = "";
        res = await fetchRequest(
            renameProjectEndpoint,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Non-leader cannot update name",
    async () => {
        let reqData = { projName: renameName };
        const res = await fetchRequest(
            renameProjectEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie2
        );
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Rename test project",
    async () => {
        let reqData = { projName: renameName };
        const res = await fetchRequest(
            renameProjectEndpoint + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            sessionCookie1
        );
        expect(res.status).toBe(200);
    },
    TIMEOUT
);

test(
    "Check renamed projected exists",
    async () => {
        const res = await fetchRequest(
            getProjectsEndpoint,
            "GET",
            null,
            sessionCookie1
        );
        expect(res.status).toBe(200);
        const projects = (await res.json()).projects;
        expect(projects.length === 1 && projects[0].name === renameName).toBe(
            true
        );

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
