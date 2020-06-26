import "babel-polyfill";
import { fetchRequest } from "fetchRequest";
import { DEFAULT_TIMEOUT } from "timeouts";
import { endpoints as ep } from "endpointUrls";
import { testUser1 } from "testUsers";

test(
    "Bad login type fails",
    async () => {
        const reqData = { type: "test" };
        const res = await fetchRequest(ep.login, "POST", reqData, null);
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Bad native email fails",
    async () => {
        let reqData = {
            type: "native",
            email: 52,
            password: "avalidpassword123",
        };
        let res = await fetchRequest(ep.login, "POST", reqData, null);
        expect(res.status).toBe(400);

        reqData.email = "not.valid.email";
        res = await fetchRequest(ep.login, "POST", reqData, null);
        expect(res.status).toBe(400);

        reqData.email = "still.not.valid.@email";
        res = await fetchRequest(ep.login, "POST", reqData, null);
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Bad native password fails",
    async () => {
        let reqData = {
            type: "native",
            email: "valid@email.com",
            password: 52,
        };
        let res = await fetchRequest(ep.login, "POST", reqData, null);
        expect(res.status).toBe(400);

        reqData.password = "2short";
        res = await fetchRequest(ep.login, "POST", reqData, null);
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Non-existent native credentials fail",
    async () => {
        let reqData = {
            type: "native",
            email: "valid@email.com",
            password: "validpassword123",
        };
        let res = await fetchRequest(ep.login, "POST", reqData, null);
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Valid credentials work",
    async () => {
        let res = await fetchRequest(ep.login, "POST", testUser1, null);
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "Bad Google token fails",
    async () => {
        let reqData = {
            type: "google",
            token: 12345,
        };
        let res = await fetchRequest(ep.login, "POST", reqData, null);
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);
