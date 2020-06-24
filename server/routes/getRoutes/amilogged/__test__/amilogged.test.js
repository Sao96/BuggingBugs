import "babel-polyfill";
import { domain } from "domain.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { } from "models";

dotenv.config();
const TIMEOUT = 20000;
const testEndpoint = domain + "amilogged";
const testemail1 = process.env.TESTEMAIL1;
const testpassword = process.env.TESTPASSWORD;

test("Get a false response when lot logged in", async () => {
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
    expect(res.status).toBe(200);
    const amILoggedRes = await res.json();
    expect(amILoggedRes.loggedIn).toBe(false);
}, TIMEOUT)

let sessionCookie1;
test(
    "Login & Get Session for user1",
    async () => {
        const loginInfo = {
            email: testemail1,
            password: testpassword,
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
        sessionCookie1 = loginRes.headers.get("set-cookie");
        expect(loginRes.status).toBe(200);
    },
    TIMEOUT
);

test("Get a true response when logged in", async () => {
    const res = await fetch(testEndpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Cookie: sessionCookie1
        },
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
    });
    expect(res.status).toBe(200);
    const amILoggedRes = await res.json();
    expect(amILoggedRes.loggedIn).toBe(true);
}, TIMEOUT)