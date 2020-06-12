import crypto from "crypto";
import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function addNativeUser
 * Expects @req.body.userData.uid to be defined
 *
 * On success registers user to db.NativeUsers and returns true
 * On failure returns false
 */
async function addNativeUser(req) {
    try {
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
        await newNativeUser.save();
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return false;
    }

    return true;
}

export { addNativeUser };
