import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function checkPid
 *
 * Verifies @req.query.pid exists and is valid
 *
 * On failure, flags an error to terminate the request.
 */
async function checkPid(req, body, res) {
    if (!req.query.pid || !mongoose.Types.ObjectId.isValid(req.query.pid)) {
        setError(req, 400, "Invalid PID", "Invalid PID");
    }

    next();
}
