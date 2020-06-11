import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

function validTid(tid) {
    return ObjectId.isValid(tid);
}

async function updateTicket(req, res, next) {
    if (!validTid(req.body.tid)) {
        req.body.err.status = 400;
        req.body.err.what = "Invalid or missing TID";
        req.body.err.resmsg = "Invalid or missing TID";
        return;
    }
    req.body.tid = ObjectId(req.body.tid);
    try {
        const where = {
            _id: req.body.tid,
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
        console.log(where, update);
        console.log(updated);
    } catch (err) {
        req.body.err.status = 500;
        req.body.err.what = err;
        req.body.err.resmsg = "An internal error has occured.";
    }
    res.status(200).send("OK");
    next();
}
export { updateTicket };
