import { setError } from "~/util/setError";

/**
 * @function leaderUpdateValid
 * Verifies the leader is going not going into a status 1
 * nor changing it into a status that it's already in.
 */
async function leaderUpdateValid(req) {
    switch (req.body.newTicketStatus) {
        case 0:
            if (req.body.ticket.status === 0) {
                setError(
                    req,
                    "400",
                    "Ticket already status 0",
                    "Ticket already open."
                );
                return false;
            }
            return true;
        case 2:
            if (req.body.ticket.status === 2) {
                setError(
                    req,
                    "400",
                    "Ticket already status 2",
                    "Ticket already closed."
                );
                return false;
            }
            return true;
        default:
            setError(
                req,
                "400",
                "Invalid ticket status.",
                "Invalid ticket status."
            );
            return false;
    }
}
/**
 * @function clientUpdateValid
 * Verifies that the .to user of the ticket is indeed the client
 * and that the user is either going from 0 -> 1 or 1 -> 0.
 */
function clientUpdateValid(req, res, next) {
    if (String(req.body.ticket.to) !== String(req.body.userData.uid)) {
        setError(
            req,
            "400",
            "User is not the recipient of ticket.",
            "Insufficient permissions."
        );
        return false;
    }
    switch (req.body.newTicketStatus) {
        case 0:
            if (req.body.ticket.status !== 1) {
                setError(
                    req,
                    "400",
                    "Insufficient privilege for status change.",
                    "Insufficient permissions."
                );
                return false;
            }
            return true;
        case 1:
            if (req.body.ticket.status !== 0) {
                setError(
                    req,
                    "400",
                    "Insufficient privilege for status change.",
                    "Insufficient permissions."
                );
                return false;
            }
            return true;
        default:
            setError(
                req,
                "400",
                "Invalid ticket status.",
                "Invalid ticket status."
            );
            return false;
    }
}

/**
 * @function validateTicketUpdate
 * Verifies that @req.body.newTicketStatus is 0,1,2 and is a possible entry
 * from either a leader or regular member. If the user is a client, the only 2
 * changes is either 0 -> 1 or 1 -> 0, and that user must be the to recipient
 * of that mail. A leader may only switch from 0 -> 2 or 2 -> 0, they cannot set
 * a ticket as pending.
 */
async function validateTicketStatusUpdate(req, res, next) {
    if (typeof req.body.newTicketStatus !== "number") {
        setError(req, 400, "Invalid ticket status", "Invalid ticket status");
        return next(req.body.err);
    }
    switch (req.body.userData.authLevel) {
        case 0:
            if (!leaderUpdateValid(req)) {
                return next(req.body.err);
            }
            break;
        case 1:
            if (!clientUpdateValid(req)) {
                return next(req.body.err);
            }
            break;
    }

    next();
}

export { validateTicketStatusUpdate };
