import "babel-polyfill";
import { domain } from "domain.js";
import { fetchRequest } from "fetchRequest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {} from "models";
import { createTestProjects } from "createTestProjects";

dotenv.config();
const TIMEOUT = 20000;
const getprojectsEndpoint = domain + "getprojects";
const loginEndpoint = domain + "login";
const testUid1 = process.env.TESTUID1;

function checkTargetsFound(projects, targets) {
    const targetSet = new Set();
    targets.forEach((target) => {
        targetSet.add(String(target._id));
    });
    let matched = 0;
    projects.forEach((project) => {
        matched += targetSet.has(String(project._id));
    });
    return matched === targets.length;
}

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
        const res = await fetchRequest(getprojectsEndpoint, "GET");
        expect(res.status).toBe(300);
    },
    TIMEOUT
);

let targets;
test(
    "Create test projects to get.",
    async () => {
        targets = await createTestProjects(testUid1, ["test1", "test2"]);
    },
    TIMEOUT
);

let sessionCookie1;
test(
    "Login & Get Session",
    async () => {
        const loginInfo = {
            email: process.env.TESTEMAIL1,
            password: process.env.TESTPASSWORD,
            type: "native",
        };
        const loginRes = await fetchRequest(loginEndpoint, "POST", loginInfo);
        sessionCookie1 = loginRes.headers.get("set-cookie");
        expect(loginRes.status).toBe(200);
    },
    TIMEOUT
);
test(
    "Get Projects",
    async () => {
        const getProjectsRes = await fetchRequest(
            getprojectsEndpoint,
            "GET",
            null,
            sessionCookie1
        );
        expect(getProjectsRes.status).toBe(200);
        const getProjectsResData = await getProjectsRes.json();
        const projects = getProjectsResData.projects;
        expect(Array.isArray(projects)).toEqual(true);
        expect(checkTargetsFound(projects, targets)).toBe(true);

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
