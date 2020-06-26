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
import { deleteTestProjects } from "deleteTestProjects";
import { createTestProjects } from "createTestProjects";

function checkProjectsFound(foundProjects, expectedProjects) {
    const createdProjectsSet = new Set();
    expectedProjects.forEach((target) => {
        createdProjectsSet.add(String(target._id));
    });
    let matched = foundProjects.reduce((total, result) => {
        return total + createdProjectsSet.has(String(result._id));
    }, 0);

    return matched === expectedProjects.length;
}

let createdProjects;

test(
    "Connect to DB",
    async () => {
        expect(await createMongooseConnection()).toBe(true);
    },
    DEFAULT_TIMEOUT
);

test(
    "Successful user1 login",
    async () => {
        testUser1.session = await createNativeTestSession(testUser1);
        expect(testUser1.session !== null).toBe(true);
    },
    DEFAULT_TIMEOUT
);

test(
    "Redirected from endpoint when not logged in",
    async () => {
        const res = await fetchRequest(ep.getprojects, "GET");
        expect(res.status).toBe(300);
    },
    DEFAULT_TIMEOUT
);

test(
    "Delete all existing projects from user1",
    async () => {
        await deleteTestProjects(testUser1.uid);
    },
    DEFAULT_TIMEOUT
);

test(
    "Create test projects to get.",
    async () => {
        createdProjects = await createTestProjects(testUser1.uid, [
            "test1",
            "test2",
        ]);
    },
    DEFAULT_TIMEOUT
);

test(
    "Get Projects from endpoint",
    async () => {
        const getProjectsRes = await fetchRequest(
            ep.getprojects,
            "GET",
            null,
            testUser1.session
        );
        expect(getProjectsRes.status).toBe(200);
        const getProjectsResData = await getProjectsRes.json();
        const foundProjects = getProjectsResData.projects;
        expect(
            Array.isArray(foundProjects) &&
                checkProjectsFound(foundProjects, createdProjects)
        ).toEqual(true);
    },
    DEFAULT_TIMEOUT
);

test(
    "Disconnect from DB",
    async () => {
        expect(await endMongooseConnection()).toBe(true);
    },
    DEFAULT_TIMEOUT
);
