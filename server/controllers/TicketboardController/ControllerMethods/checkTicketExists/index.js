import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const ObjectId = mongoose.Types.ObjectId;

function validTid(tid) {
    return ObjectId.isValid(tid);
}

async function checkTicketExists(req, res, next) {
    if (!validTid(req.body.tid)) {
        req.body.err.status = 400;
        req.body.err.what = "Invalid or missing TID";
        req.body.err.resmsg = "Invalid or missing TID";
        return;
    }
    req.body.tid = ObjectId(req.body.tid);
    try {
        const found = mongoose
            .model("Ticket")
            .exists({ _id: req.body.tid, pid: req.body.pid });
        if (!found) {
            req.body.err.status = 400;
            req.body.err.what = "Ticket does not exist.";
            req.body.err.resmsg = "Ticket does not exist.";
            return;
        }
    } catch (err) {
        console.log(err);
        req.body.err.status = 500;
        req.body.err.what = err;
        req.body.err.resmsg = "An internal error has occured.";
    }

    next();
}
export { checkTicketExists };
