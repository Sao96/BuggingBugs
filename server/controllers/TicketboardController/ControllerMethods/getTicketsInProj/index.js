import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function getTicketsInProj
 * Expects all used req fields have been verified already.
 *
 * On success, sets @req.body.ticketsFound to be the result of a DB search
 * for tickets of a given project based on the users privilege.
 */
async function getTicketsInProj(req, res, next) {
    try {
        const uid = req.body.userData.uid;
        const targetIds = req.body.targetIds;
        const usersFound = req.body.usersFound;
        const ticketsSearch = {
            pid: mongoose.Types.ObjectId(req.query.pid),
        };
        if (req.body.userData.authLevel === 1) {
            ticketsSearch.to = mongoose.Types.ObjectId(uid);
        }
        const Tickets = mongoose.model("Ticket");
        req.body.ticketsFound = await Tickets.find(ticketsSearch);
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    next();
}

export { getTicketsInProj };
