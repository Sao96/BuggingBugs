import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { setError } from "~/util/setError";

/**
 * @function checkTicketExists
 * Expects @req.body.tid to be defined.
 *
 * On success registers user to db.GlobalUsers and db./respective table/
 * and sets @req.body.targetIds to the client sending and the recipient
 */
async function checkTicketExists(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.body.tid)) {
        setError(req, 400, "Invalid or missing TID", "Invalid or missing TID");
        return next(req.body.err);
    }
    try {
        const tid = mongoose.Types.ObjectId(req.body.tid);
        const pid = mongoose.Types.ObjectId(req.query.pid);
        req.body.ticket = await mongoose
            .model("Ticket")
            .find({ _id: tid, pid: pid });

        if (req.body.ticket.length === 0) {
            setError(
                req,
                400,
                "Ticket does not exist.",
                "Ticket does not exist"
            );
            return next(req.body.err);
        }
        req.body.ticket = req.body.ticket[0];
    } catch (err) {
        setError(req, 500, err, "An internal error has occured");
        return next(req.body.err);
    }

    next();
}
export { checkTicketExists };
