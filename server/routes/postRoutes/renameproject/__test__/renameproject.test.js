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
import { addUserToTestProject } from "addUserToTestProject";

let createdProjects;
const renameName = "Renamed";

test(
    "Connect to DB",
    async () => {
        expect(await createMongooseConnection()).toBe(true);
    },
    DEFAULT_TIMEOUT
);

test(
    "Successful user1, user2 login",
    async () => {
        testUser1.session = await createNativeTestSession(testUser1);
        expect(testUser1.session !== null).toBe(true);
        testUser2.session = await createNativeTestSession(testUser2);
        expect(testUser2.session !== null).toBe(true);
    },
    DEFAULT_TIMEOUT
);

test(
    "Redirected from endpoint when not logged in",
    async () => {
        const res = await fetchRequest(ep.renameproject, "POST");
        expect(res.status).toBe(300);
    },
    DEFAULT_TIMEOUT
);

test(
    "Create test project from user1.",
    async () => {
        const newProjects = ["test1"];
        createdProjects = await createTestProjects(testUser1.uid, newProjects);
    },
    DEFAULT_TIMEOUT
);

test(
    "Add user2 into test project.",
    async () => {
        await addUserToTestProject(testUser2.uid, createdProjects[0]._id, 1);
    },
    DEFAULT_TIMEOUT
);

test(
    "Reject invalid project name",
    async () => {
        const reqData = {
            projName: 123,
        };
        let res = await fetchRequest(
            ep.renameproject,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);

        reqData.projName = "";
        res = await fetchRequest(
            ep.renameproject,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Non-leader cannot update name",
    async () => {
        let reqData = { projName: renameName };
        const res = await fetchRequest(
            ep.renameproject + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser2.session
        );
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Rename test project",
    async () => {
        let reqData = { projName: renameName };
        const res = await fetchRequest(
            ep.renameproject + "?pid=" + createdProjects[0]._id,
            "POST",
            reqData,
            testUser1.session
        );
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "Check renamed projected exists",
    async () => {
        const res = await fetchRequest(
            ep.getprojects,
            "GET",
            null,
            testUser1.session
        );
        expect(res.status).toBe(200);
        const projects = (await res.json()).projects;
        let found = false;
        for (let i = 0; i < projects.length; i++) {
            if (String(projects[i]._id) === String(createdProjects[0]._id)) {
                found = projects[i].name === renameName;
                break;
            }
        }
        expect(found).toBe(true);
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
