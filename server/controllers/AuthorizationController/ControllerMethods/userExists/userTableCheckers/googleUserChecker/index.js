import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function googleUserChecker
 * Expects @req.body.googleInfo.sub to be well defined.
 *
 * On success sets @req.body.dbSearch to what @db.GoogleUsers finds.
 */
async function googleUserChecker(req) {
    const filter = {
        sub: req.body.googleInfo.sub,
    };
    try {
        req.body.dbSearch = await mongoose.model("GoogleUser").find(filter);
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return false;
    }

    return true;
}

export { googleUserChecker };
