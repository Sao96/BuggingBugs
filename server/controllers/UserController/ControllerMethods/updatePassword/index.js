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
    try {
        const pwSalt = crypto.randomBytes(16);
        const pwSaltedHash = crypto
            .createHash("sha256")
            .update(req.body.password + pwSalt)
            .digest("hex");
        const changed = await mongoose
            .model("NativeUser")
            .updateMany(
                { uid: req.body.userData.uid },
                { pwSalt: pwSalt, pwSaltedHash: pwSaltedHash }
            );
        if (changed.n === 0) {
            setError(
                req,
                400,
                "Not a native user",
                "The email attached to your account is not registered through BuggingBugs."
            );
            return next(req.body.err);
        }
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    req.body.res.status = 200;
    next();
}

export { updatePassword };
