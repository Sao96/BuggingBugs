import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

async function validRecipients(params) {
    const UsersIn = mongoose.model("usersin");
    const fromSearchInfo = {
        uid: ObjectId(params.from),
        pid: params.pid,
        perm: 0,
    };
    const toSearchInfo = {
        uid: ObjectId(params.to),
        pid: params.pid,
    };

    //set error message here!
    if (!(await UsersIn.exists(fromSearchInfo))) {
        return false;
    }
    if (!(await UsersIn.exists(toSearchInfo))) {
        return false;
    }

    return true;
}

async function createTicket(req, res) {
    if (!(await validRecipients(req.ticketInfo))) {
        res.status(550).send(errMsg[550]);
        return;
    }

    const Tickets = mongoose.model("ticket");
    Tickets.insertOne(req.ticketInfo, (err) => {
        if (err) {
            // logError(req, err, 550)
            res.status(500).send(errMsg[500]);
            return;
        }
        res.status(201);
    });
}

export { createTicket };
