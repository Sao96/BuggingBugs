import mongoose from "mongoose";
import { setError } from "~/util/setError";
import crypto from "crypto";

const validPasswords = (password, repassword) => {
    return (
        typeof password === "string" &&
        typeof repassword === "string" &&
        password === repassword &&
        password.length >= 8
    );
};

async function updatePassword(req, res, next) {
    if (!validPasswords(req.body.password, req.body.repassword)) {
        setError(
            req,
            400,
            "Invalid password entries.",
            "Invalid password entries. Please ensure both are 8 or more characters and are the same."
        );
        return next(req.body.err);
    }
    let changed;
    try {
        const pwSalt = crypto.randomBytes(16);
        const pwSaltedHash = crypto
            .createHash("sha256")
            .update(req.body.userData.password + pwSalt)
            .digest("hex");
        changed = mongoose
            .model("NativeUser")
            .updateOne(
                { _id: req.body.userData.uid },
                { pwSalt: pwSalt, pwSaltedHash: pwSaltedHash }
            );
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    console.log(changed);
    req.body.res.status = 200;
    next();
}

export { updatePassword };
