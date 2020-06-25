import "babel-polyfill";
import { domain } from "domain.js";
import { fetchRequest } from "fetchRequest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { } from "models";
import { deleteTestProjects } from "deleteTestProjects";

dotenv.config();
const TIMEOUT = 30000;
const loginEndpoint = domain + "login";
const getProjectsEndpoint = domain + "getprojects";
const createProjectEndpoint = domain + "createproject";
const testEmail1 = process.env.TESTEMAIL1
const testUid1 = process.env.TESTUID1
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
        const res = await fetchRequest(createProjectEndpoint, "POST");
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

test("Create group of invalid name", async () => {
    const reqData = { projectName: 123 }
    let res = await fetchRequest(createProjectEndpoint, "POST", reqData, sessionCookie1)
    expect(res.status).toBe(400)

    reqData.projectName = "";
    res = await fetchRequest(createProjectEndpoint, "POST", reqData, sessionCookie1)
    expect(res.status).toBe(400)
}, TIMEOUT)

test("Delete any existing groups for user1", async () => {
    await deleteTestProjects(testUid1);
}, TIMEOUT)

const testName = "test name"
test("Create group of a valid name", async () => {
    const reqData = { projectName: testName };
    let res = await fetchRequest(createProjectEndpoint, "POST", reqData, sessionCookie1);
    expect(res.status).toBe(200);
}, TIMEOUT)

test("Check created group exists", async () => {
    let res = await fetchRequest(getProjectsEndpoint, "GET", null, sessionCookie1);
    expect(res.status).toBe(200);
    const groups = (await res.json())
    expect(groups.length === 1 && groups[0].name === testName)
}, TIMEOUT)

