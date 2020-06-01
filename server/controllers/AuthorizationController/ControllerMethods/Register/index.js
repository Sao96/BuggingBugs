import mongoose from "mongoose";
import encryptHelper from "util/encrypt";
import decryptHeler from "util/decrypt";
import crypto from "crypto";
async function register(req, res) {
    //assume each field is verified already
    //put the new record in the database
    //get the ID, send it back to the user
    const pwSalt = crypto.randomBytes(16);
    const pwSaltedHash = crypto
        .createHash("sha256")
        .update(req.body.password + pwSalt)
        .digest("hex");
    // const date = new Date().toISOString().slice(0, 10);

    const regInfo = {
        email: req.email,
        username: req.username,
        pwSalt: pwSalt,
        pwSaltedHashed: pwSaltedHash,
    };
}
export { register };
