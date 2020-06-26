import dotenv from "dotenv";

dotenv.config();

const testUser1 = {
    uid: process.env.TESTUID1,
    email: process.env.TESTEMAIL1,
    password: process.env.TESTPASSWORD,
    type: "native",
    session: null,
};

const testUser2 = {
    uid: process.env.TESTUID2,
    email: process.env.TESTEMAIL2,
    password: process.env.TESTPASSWORD,
    type: "native",
    session: null,
};

export { testUser1, testUser2 };
