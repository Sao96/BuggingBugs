import "babel-polyfill";
import { fetchRequest } from "fetchRequest";
import { DEFAULT_TIMEOUT } from "timeouts";
import { endpoints as ep } from "endpointUrls";
import { createNativeTestSession } from "createNativeTestSession";
import { testUser1 } from "testUsers";

test(
    "Get a false response when not logged in",
    async () => {
        const res = await fetchRequest(ep.amilogged, "GET");
        expect(res.status).toBe(200);
        const amILoggedRes = await res.json();
        expect(amILoggedRes.loggedIn).toBe(false);
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
    "Get a true response when logged in",
    async () => {
        const res = await fetchRequest(
            ep.amilogged,
            "GET",
            null,
            testUser1.session
        );
        expect(res.status).toBe(200);
        const amILoggedRes = await res.json();
        expect(amILoggedRes.loggedIn).toBe(true);
    },
    DEFAULT_TIMEOUT
);

test(
    "Request logout to server",
    async () => {
        const logoutRes = await fetchRequest(
            ep.logout,
            "POST",
            null,
            testUser1.session
        );
        expect(logoutRes.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "Get a false response when not logged in with cookie",
    async () => {
        const res = await fetchRequest(
            ep.amilogged,
            "GET",
            null,
            testUser1.session
        );
        expect(res.status).toBe(200);
        const amILoggedRes = await res.json();
        expect(amILoggedRes.loggedIn).toBe(false);
    },
    DEFAULT_TIMEOUT
);
