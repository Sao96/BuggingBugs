import "babel-polyfill";
import { fetchRequest } from "fetchRequest";
import { DEFAULT_TIMEOUT } from "timeouts";
import { endpoints as ep } from "endpointUrls";
import { createNativeTestSession } from "createNativeTestSession";
import { testUser1 } from "testUsers";
import {
    createMongooseConnection,
    endMongooseConnection,
} from "mongooseConnection";
import { createTestProjects } from "createTestProjects";
import { matchDbResults } from "../../../../util/testing/matchDbResults";

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
        const foundProjects = (await getProjectsRes.json()).projects;
        expect(matchDbResults(foundProjects, createdProjects, "_id", "_id").length === createdProjects.length);
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
