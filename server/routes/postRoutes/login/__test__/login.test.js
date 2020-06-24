import "babel-polyfill";
import { domain } from "domain.js";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const testEmail1 = process.env.TESTEMAIL1;
const testPassword = process.env.TESTPASSWORD;
const googleFailToken = process.env.GOOGLEINVALIDTOKEN;
const googleValidToken = process.env.GOOGLEVALIDTOKEN;
const TIMEOUT = 20000;
const testEndpoint = domain + "login";

test(
    "Bad login type fails",
    async () => {
        const reqData = { type: "test" };
        const res = await fetch(testEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(reqData),
        });
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Bad native email fails",
    async () => {
        let reqData = {
            type: "native",
            email: 52,
            password: "avalidpassword123",
        };
        let res = await fetch(testEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(reqData),
        });
        expect(res.status).toBe(400);

        reqData.email = "not.valid.email";
        res = await fetch(testEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(reqData),
        });
        expect(res.status).toBe(400);

        reqData.email = "still.not.valid.@email";
        res = await fetch(testEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(reqData),
        });
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Bad native password fails",
    async () => {
        let reqData = {
            type: "native",
            email: "valid@email.com",
            password: 52,
        };
        let res = await fetch(testEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(reqData),
        });
        expect(res.status).toBe(400);

        reqData.password = "2short";
        res = await fetch(testEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(reqData),
        });
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Non-existent native credentials fail",
    async () => {
        let reqData = {
            type: "native",
            email: "valid@email.com",
            password: "validpassword123",
        };
        let res = await fetch(testEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(reqData),
        });
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Valid credentials work",
    async () => {
        let reqData = {
            type: "native",
            email: testEmail1,
            password: testPassword,
        };
        let res = await fetch(testEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(reqData),
        });
        expect(res.status).toBe(200);
    },
    TIMEOUT
);

test(
    "Unregistered Google user fails",
    async () => {
        let reqData = {
            type: "google",
            token: googleFailToken,
        };
        let res = await fetch(testEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(reqData),
        });
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Bad Google token fails",
    async () => {
        let reqData = {
            type: "google",
            token: 12345,
        };
        let res = await fetch(testEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(reqData),
        });
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Registered google user succeeds",
    async () => {
        let reqData = {
            type: "google",
            token: googleValidToken,
        };
        let res = await fetch(testEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(reqData),
        });
        expect(res.status).toBe(200);
    },
    TIMEOUT
);
