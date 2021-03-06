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
import { matchDbResults } from "matchDbResults"

const testName = "test name";
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
    "Create group of invalid name",
    async () => {
        const reqData = { projectName: 123 };
        let res = await fetchRequest(
            ep.createproject,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);

        reqData.projectName = "";
        res = await fetchRequest(
            ep.createproject,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Create group of a valid name",
    async () => {
        const reqData = { projectName: testName };
        let res = await fetchRequest(
            ep.createproject,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(200);
        createdProjects = [(await res.json()).projInfo];
    },
    DEFAULT_TIMEOUT
);

test(
    "Check created group exists",
    async () => {
        let res = await fetchRequest(
            ep.getprojects,
            "GET",
            null,
            testUser1.session
        );
        expect(res.status).toBe(200);
        const foundProjects = (await res.json()).projects;
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
