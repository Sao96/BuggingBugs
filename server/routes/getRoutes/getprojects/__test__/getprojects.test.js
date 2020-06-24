import "babel-polyfill";
import { domain } from "domain.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {} from "models";

dotenv.config();
const TIMEOUT = 20000;
const testEndpoint = domain + "getprojects";

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
        const res = await fetch(testEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
        });
        expect(res.status).toBe(300);
    },
    TIMEOUT
);

let targets;
test(
    "Create test projects to get.",
    async () => {
        try {
            targets = await mongoose.model("Project").insertMany([
                { name: "test1", expireOn: new Date() },
                { name: "test2", expireOn: new Date() },
            ]);
            await mongoose.model("UserIn").insertMany([
                {
                    uid: process.env.TESTUID,
                    pid: targets[0]._id,
                    expireOn: new Date(),
                },
                {
                    uid: process.env.TESTUID,
                    pid: targets[1]._id,
                    expireOn: new Date(),
                },
            ]);
        } catch (err) {
            fail(err);
        }
    },
    TIMEOUT
);

let sessionCookie;
test(
    "Login & Get Session",
    async () => {
        const loginInfo = {
            email: process.env.TESTEMAIL,
            password: process.env.TESTPASSWORD,
            type: "native",
        };

        const loginEndpoint = domain + "login";
        const loginRes = await fetch(loginEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(loginInfo),
        });
        sessionCookie = loginRes.headers.get("set-cookie");
        expect(loginRes.status).toBe(200);
    },
    TIMEOUT
);
test(
    "Get Projects",
    async () => {
        const getProjectsRes = await fetch(testEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Cookie: sessionCookie,
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
        });
        expect(getProjectsRes.status).toBe(200);
        const getProjectsResData = await getProjectsRes.json();
        const projects = getProjectsResData.projects;
        expect(Array.isArray(projects)).toEqual(true);
        expect(checkTargetsFound(projects, targets)).toBe(true);
        await mongoose.connection.close();
    },

    TIMEOUT
);
