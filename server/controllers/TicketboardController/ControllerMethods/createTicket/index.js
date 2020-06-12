import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function createTicket
 * Expects all used req fields compose a Ticket model.
 * Verifies that the client has sufficient privileges create a ticket.
 *
 * On success, pushes a new ticket onto the database with the given
 * information.
 */
async function createTicket(req, res, next) {
    const from_uid = req.body.userData.uid;
    const from_uid_idx = req.body.targetIds[from_uid];

    req.body.usersFound[from_uid_idx].authLevel;
    if (req.body.usersFound[from_uid_idx].authLevel !== 0) {
        setError(
            req,
            400,
            "Insufficient Permissions to create ticket",
            "Insufficient Permissions to create ticket"
        );
        return next(req.body.err);
    }
    try {
        const Tickets = mongoose.model("Ticket");
        const newTicket = new Tickets({
            pid: req.query.pid,
            from: req.body.userData.uid,
            to: req.body.to,
            priority: req.body.priority,
            due: req.body.due,
            environment: req.body.environment,
            tags: req.body.tags,
            headline: req.body.headline,
            summary: req.body.summary,
        });
        await newTicket.save();
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    req.body.res.status = 200;
    req.body.res.data = {};
    next();
}

export { createTicket };
