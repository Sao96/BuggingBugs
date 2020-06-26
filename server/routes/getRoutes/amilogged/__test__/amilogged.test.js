import "babel-polyfill";
import { fetchRequest } from "fetchRequest";
import { DEFAULT_TIMEOUT } from "timeouts";
import { endpoints as ep } from "endpointUrls";
import { testUser1 } from "testUsers";
import { createNativeTestSession } from "createNativeTestSession";

test(
    "Get a false response from endpoint when not logged in.",
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
    "Get a true response from endpoint when logged in.",
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
