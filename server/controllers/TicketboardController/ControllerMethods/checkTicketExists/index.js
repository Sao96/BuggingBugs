import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { setError } from "~/util/setError";

/**
 * @function checkTicketExists
 * Expects @req.body.tid to be defined.
 *
 * On success registers user to db.GlobalUsers and db./respective table/
 * and sets
 */
async function checkTicketExists(req, res, next) {
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(req.body.tid)) {
        setError(req, 400, "Invalid or missing TID", "Invalid or missing TID");
        return next(req.body.err);
    }
    req.body.tid = ObjectId(req.body.tid);
    try {
        const found = mongoose
            .model("Ticket")
            .exists({ _id: req.body.tid, pid: req.body.pid });
        if (!found) {
            setError(
                req,
                400,
                "Ticket does not exist.",
                "Ticket does not exist"
            );
            return next(req.body.err);
        }
    } catch (err) {
        setError(req, 500, err, "An internal error has occured");
        return next(req.body.err);
    }

    next();
}
export { checkTicketExists };
