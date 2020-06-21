import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function deleteTicket
 * Removes from @db.Tickets the ticket containing @req.body.tid
 */
async function deleteTicket(req, res, next) {
    try {
        const tid = mongoose.Types.ObjectId(req.body.tid);
        await mongoose.model("Ticket").remove({ _id: tid });
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    req.body.res.status = 200;
    req.body.res.data = {};
    next();
}

export { deleteTicket };
