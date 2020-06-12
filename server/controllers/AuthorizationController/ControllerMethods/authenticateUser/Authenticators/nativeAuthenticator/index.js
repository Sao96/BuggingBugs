import crypto from "crypto";
import { setError } from "~/util/setError";
/**
 * @function nativeAuthenticator
 * Expects @req.body.dbSearch to be a list with with at 1 element from
 * @db.NativeUsers.
 *
 * On success, sets @req.body.userData.uid with the found UID and returns true.
 */
function nativeAuthenticator(req) {
    const pwSalt = req.body.dbSearch[0].pwSalt;
    const reqPWEncrypt = crypto
        .createHash("sha256")
        .update(req.body.password + pwSalt)
        .digest("hex");
    if (reqPWEncrypt !== req.body.dbSearch[0].pwSaltedHash) {
        setError(req, 400, "Invalid Credentials", "Invalid Credentials");
        return false;
    }

    req.body.userData.uid = req.body.dbSearch[0].uid;
    return true;
}

export { nativeAuthenticator };
