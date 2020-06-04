import crypto from "crypto";
import mongoose from "mongoose";

async function addNativeUser(req) {
    const NativeUser = mongoose.model("NativeUser");
    const pwSalt = crypto.randomBytes(16);
    const saltedPwHash = crypto
        .createHash("sha256")
        .update(req.body.userData.password + pwSalt)
        .digest("hex");
    const newNativeUser = new NativeUser({
        uid: req.body.userData.uid,
        email: req.body.userData.email,
        pwSalt: pwSalt,
        pwSaltedHash: saltedPwHash,
    });

    await newNativeUser.save((err) => {
        if (err) {
            req.body.err.status = 500;
            req.body.err.restext = "An internal error has occured";
            req.body.err.what = err;
        }
    });
}

export { addNativeUser };
