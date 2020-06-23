import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function updateTicketStatus
 * Searches in @db.Tickets for _id of @req.body.tid and changes the status of
 * the ticket to @req.body.newTicketStatus
 */
async function updateTicketStatus(req, res, next) {
    try {
        const tid = mongoose.Types.ObjectId(req.body.tid);
        await mongoose
            .model("Ticket")
            .update({ _id: tid }, { status: req.body.newTicketStatus });
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    req.body.res.status = 200;
    req.body.res.data = {};
    next();
}

export { updateTicketStatus };
