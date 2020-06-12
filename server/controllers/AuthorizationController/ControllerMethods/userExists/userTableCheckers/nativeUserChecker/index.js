import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function nativeUserChecker
 * Expects @req.body.userData.email to be well defined.
 *
 * On success sets @req.body.dbSearch to what @db.NativeUsers finds.
 */
async function nativeUserChecker(req) {
    const filter = {
        email: req.body.userData.email,
    };
    try {
        req.body.dbSearch = await mongoose.model("NativeUser").find(filter);
    } catch (err) {
        setError(500, err, "An internal error has occured.");
        return false;
    }

    return true;
}

export { nativeUserChecker };
