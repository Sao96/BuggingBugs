import mongoose from "mongoose";

async function createTicket(req, res, next) {
    const from_uid = req.body.userData.uid;
    const from_uid_idx = req.body.targetIds[from_uid];

    req.body.usersFound[from_uid_idx].authLevel;
    if (req.body.usersFound[from_uid_idx].authLevel !== 0) {
        req.body.err.status = 400;
        req.body.err.what = "Insufficient Permissions to create ticket";
        req.body.err.resmsg = "Insufficient Permissions to create ticket";
    } else {
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
        try {
            await newTicket.save();
            res.status(200).send("OK");
        } catch (err) {
            console.log(err);
            req.body.err.status = 500;
            req.body.err.what = err;
            req.body.err.resmsg = "An internal error has occured.";
        }
    }
}

export { createTicket };
