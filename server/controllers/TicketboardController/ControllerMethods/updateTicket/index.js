import mongoose from "mongoose";
import { setError } from "~/util/setError";

const ObjectId = mongoose.Types.ObjectId;

function validTid(tid) {
    return ObjectId.isValid(tid);
}

async function updateTicket(req, res, next) {
    const from_uid = mongoose.Types.ObjectId(req.body.userData.uid);
    const to_uid = mongoose.Types.ObjectId(req.body.to);
    if (
        req.body.targetIds[from_uid] == -1 ||
        req.body.targetIds[to_uid] == -1
    ) {
        setError(
            req,
            400,
            "You or who your sending to isn't in the group.",
            "You or who your sending to isn't in the group."
        );
        return next(req.body.err);
    }
    const from_uid_idx = req.body.targetIds[req.body.userData.uid];
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

    req.body.res.status = 200;
    req.body.res.data = {};
    next();
}
export { updateTicket };
