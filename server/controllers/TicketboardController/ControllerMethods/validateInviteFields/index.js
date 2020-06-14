import mongoose from "mongoose";
import { setError } from "~/util/setError";
/**
 * @function validateInviteFields
 * Verifies that all submitted values for a user invite are valid.
 *
 * On success, sets req.body.targetIds to uid of sender and to id.
 * On failure, an error is thrown and query is terminated.
 */
function validateInviteFields(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.body.to)) {
        setError(req, 400, "Invalid ID format.", "Invalid ID format.");
        next(req.body.err);
    }
    req.body.targetIds = {
        [req.body.userData.uid]: -1,
        [req.body.to]: -1,
    };

    next();
}
export { validateInviteFields };
