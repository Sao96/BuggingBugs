import "babel-polyfill";
import { domain } from "domain.js";
import { fetchRequest } from "fetchRequest";
import dotenv from "dotenv";

dotenv.config();
const testEmail1 = process.env.TESTEMAIL1;
const testPassword = process.env.TESTPASSWORD;
const TIMEOUT = 20000;
const logoutEndpoint = domain + "logout";
const amiloggedEndpoint = domain + "amilogged";
const loginEndpoint = domain + "login";

test(
    "Get a false response when not logged in",
    async () => {
        const res = await fetchRequest(amiloggedEndpoint, "GET");
        expect(res.status).toBe(200);
        const amILoggedRes = await res.json();
        console.log("concernfroge", res, amILoggedRes);
        expect(amILoggedRes.loggedIn).toBe(false);
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

test(
    "Get a true response when logged in",
    async () => {
        const res = await fetchRequest(
            amiloggedEndpoint,
            "GET",
            null,
            sessionCookie1
        );
        expect(res.status).toBe(200);
        const amILoggedRes = await res.json();
        expect(amILoggedRes.loggedIn).toBe(true);
    },
    TIMEOUT
);

test(
    "Request logout to server",
    async () => {
        const logoutRes = await fetchRequest(
            logoutEndpoint,
            "POST",
            null,
            sessionCookie1
        );
        expect(logoutRes.status).toBe(200);
    },
    TIMEOUT
);

test(
    "Get a false response when not logged in with cookie",
    async () => {
        const res = await fetchRequest(
            amiloggedEndpoint,
            "GET",
            null,
            sessionCookie1
        );
        expect(res.status).toBe(200);
        const amILoggedRes = await res.json();
        expect(amILoggedRes.loggedIn).toBe(false);
    },
    TIMEOUT
);
