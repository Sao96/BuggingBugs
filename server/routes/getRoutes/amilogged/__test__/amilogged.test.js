import "babel-polyfill";
import { domain } from "domain.js";
import { fetchRequest } from "fetchRequest";
import dotenv from "dotenv";
import {} from "models";

dotenv.config();
const TIMEOUT = 30000;
const amiloggedEndpoint = domain + "amilogged";
const loginEndpoint = domain + "login";
const testemail1 = process.env.TESTEMAIL1;
const testpassword = process.env.TESTPASSWORD;

test(
    "Get a false response when not logged in",
    async () => {
        const res = await fetchRequest(amiloggedEndpoint, "GET");
        expect(res.status).toBe(200);
        const amILoggedRes = await res.json();
        expect(amILoggedRes.loggedIn).toBe(false);
    },
    TIMEOUT
);

let sessionCookie1;
test(
    "Login & Get Session for user1",
    async () => {
        const loginInfo = {
            email: testemail1,
            password: testpassword,
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
