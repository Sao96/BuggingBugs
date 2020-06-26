import "babel-polyfill";
import { fetchRequest } from "fetchRequest";
import { DEFAULT_TIMEOUT } from "timeouts";
import { endpoints as ep } from "endpointUrls";
import {
    createMongooseConnection,
    endMongooseConnection,
} from "mongooseConnection";
import { deleteTestUser } from "deleteTestUser";

const registerEmail = "registertest@buggingbugs.bug";
const validNativeSample = {
    type: "native",
    email: registerEmail,
    firstName: "Valid",
    lastName: "Name",
    password: "validpassword123",
    repassword: "validpassword123",
};
Object.freeze(validNativeSample);

test(
    "Connect to DB",
    async () => {
        expect(await createMongooseConnection()).toBe(true);
    },
    DEFAULT_TIMEOUT
);

test(
    "Remove test user if exists",
    async () => {
        await deleteTestUser(validNativeSample.email);
    },
    DEFAULT_TIMEOUT
);

test(
    "Bad register type fails",
    async () => {
        const reqData = { type: "test" };
        let res = await fetchRequest(ep.register, "POST", reqData, null);
        expect(res.status).toBe(400);

        reqData.type = 123;
        res = await fetchRequest(ep.register, "POST", reqData, null);
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Bad native email fails",
    async () => {
        let reqData = { ...validNativeSample };

        reqData.email = 52;
        let res = await fetchRequest(ep.register, "POST", reqData, null);
        expect(res.status).toBe(400);

        reqData.email = "not.a.valid.email";
        res = await fetchRequest(ep.register, "POST", reqData, null);
        expect(res.status).toBe(400);

        reqData.email = "still.not.a.valid.@email";
        res = await fetchRequest(ep.register, "POST", reqData, null);
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Bad first & last name fails",
    async () => {
        let reqData = { ...validNativeSample };

        reqData.firstName = 52;
        reqData.lastName = "first was invalid";
        let res = await fetchRequest(ep.register, "POST", reqData);
        expect(res.status).toBe(400);

        reqData.firstName = "second was invalid";
        reqData.lastName = 123;
        res = await fetchRequest(ep.register, "POST", reqData);
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Bad password & repassword",
    async () => {
        let reqData = { ...validNativeSample };

        reqData.password = 12345678;
        reqData.repassword = 12345678;
        let res = await fetchRequest(ep.register, "POST", reqData);
        expect(res.status).toBe(400);

        reqData.password = "1234";
        reqData.repassword = "1234";
        res = await fetchRequest(ep.register, "POST", reqData);
        expect(res.status).toBe(400);

        reqData.password = "12345678";
        reqData.repassword = "123456789";
        res = await fetchRequest(ep.register, "POST", reqData);
        expect(res.status).toBe(400);
    },
    DEFAULT_TIMEOUT
);

test(
    "Valid native user creation",
    async () => {
        let reqData = { ...validNativeSample };
        let res = await fetchRequest(ep.register, "POST", reqData);
        expect(res.status).toBe(200);
    },
    DEFAULT_TIMEOUT
);

test(
    "Created user can log in",
    async () => {
        let reqData = { ...validNativeSample };
        let res = await fetchRequest(ep.login, "POST", reqData);
        expect(res.status).toBe(200);
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
