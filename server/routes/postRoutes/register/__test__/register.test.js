import "babel-polyfill";
import { domain } from "domain.js";
import { fetchRequest } from "fetchRequest";
import { deleteTestUser } from "deleteTestUser";
import {} from "models";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const registerEmail = process.env.REGISTERTESTEMAIL;
const TIMEOUT = 20000;
const registerEndpoint = domain + "register";
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
        await mongoose.connect(process.env.DBURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        expect(true).toBe(true);
    },
    TIMEOUT
);
test(
    "Remove test user if exists",
    async () => {
        await deleteTestUser(registerEmail);
    },
    TIMEOUT
);

test(
    "Bad register type fails",
    async () => {
        const reqData = { type: "test" };
        let res = await fetchRequest(registerEndpoint, "POST", reqData, null);
        expect(res.status).toBe(400);

        reqData.type = 123;
        res = await fetchRequest(registerEndpoint, "POST", reqData, null);
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Bad native email fails",
    async () => {
        let reqData = { ...validNativeSample };

        reqData.email = 52;
        let res = await fetchRequest(registerEndpoint, "POST", reqData, null);
        expect(res.status).toBe(400);

        reqData.email = "not.valid.email";
        res = await fetchRequest(registerEndpoint, "POST", reqData, null);
        expect(res.status).toBe(400);

        reqData.email = "still.not.valid.@email";
        res = await fetchRequest(registerEndpoint, "POST", reqData, null);
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Bad first & last name fails",
    async () => {
        let reqData = { ...validNativeSample };

        reqData.firstName = 52;
        reqData.lastName = "first was invalid";
        let res = await fetchRequest(registerEndpoint, "POST", reqData);
        expect(res.status).toBe(400);

        reqData.firstName = "second was invalid";
        reqData.lastName = 123;
        res = await fetchRequest(registerEndpoint, "POST", reqData);
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Bad password & repassword",
    async () => {
        let reqData = { ...validNativeSample };

        reqData.password = 12345678;
        reqData.repassword = 12345678;
        let res = await fetchRequest(registerEndpoint, "POST", reqData);
        expect(res.status).toBe(400);

        reqData.password = "1234";
        reqData.repassword = "1234";
        res = await fetchRequest(registerEndpoint, "POST", reqData);
        expect(res.status).toBe(400);

        reqData.password = "12345678";
        reqData.repassword = "123456789";
        res = await fetchRequest(registerEndpoint, "POST", reqData);
        expect(res.status).toBe(400);
    },
    TIMEOUT
);

test(
    "Valid native user creation",
    async () => {
        let reqData = { ...validNativeSample };
        let res = await fetchRequest(registerEndpoint, "POST", reqData);
        expect(res.status).toBe(200);

        await mongoose.connection.close();
    },
    TIMEOUT
);

(async () => {
    if (
        mongoose.connection.readyState === 1 ||
        mongoose.connection.readyState === 2
    ) {
        await mongoose.connection.close();
    }
})();
