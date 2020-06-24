import "babel-polyfill";
import { domain } from "domain.js";
import { fetchRequest } from "fetchRequest";
import dotenv from "dotenv";

dotenv.config();
const testEmail1 = process.env.TESTEMAIL1;
const testPassword = process.env.TESTPASSWORD;
const TIMEOUT = 20000;
const registerEndpoint = domain + "register";

test(
    "Bad register type fails",
    async () => {
        const reqData = { type: "test" };
        const res = await fetchRequest(registerEndpoint, "POST", reqData, null);
        expect(res.status).toBe(400);
    },
    TIMEOUT
);
