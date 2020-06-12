import mongoose from "mongoose";
import { setError } from "~/util/setError";

const ObjectId = mongoose.Types.ObjectId;

function validTid(tid) {
    return ObjectId.isValid(tid);
}

async function updateTicket(req, res, next) {
    if (req.body.usersFound[from_uid_idx].authLevel !== 0) {
        setError(
            req,
            400,
            "Insufficient Permissions to create ticket",
            "Insufficient Permissions to create ticket"
        );
        return next(req.body.err);
    }

    const tid = ObjectId(req.body.tid);
    try {
        const where = {
            _id: tid,
            pid: ObjectId(req.query.pid),
        };
        const update = {
            $set: {
                to: req.body.to,
                priority: req.body.priority,
                due: req.body.due,
                environment: req.body.environment,
                tags: req.body.tags,
                headline: req.body.headline,
                summary: req.body.summary,
            },
        };
        const updated = await mongoose.model("Ticket").update(where, update);
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    req.res.status = 200;
    req.res.data = {};
    next();
}
export { updateTicket };
