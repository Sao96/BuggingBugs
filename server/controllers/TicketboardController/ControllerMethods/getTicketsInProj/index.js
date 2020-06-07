import mongoose from "mongoose";

async function getTicketsInProj(req, res, next) {
    try {
        const uid = req.body.userData.uid;
        const targetIds = req.body.targetIds;
        const usersFound = req.body.usersFound;
        const ticketsSearch = {
            pid: req.query.pid,
        };
        if (usersFound[targetIds[uid]].authLevel === 1) {
            ticketsSearch.uid = uid;
        }
        const Tickets = mongoose.model("Ticket");
        req.body.ticketsFound = await Tickets.find(ticketsSearch);
    } catch (err) {
        req.body.err.status = 500;
        req.body.err.what = err;
        req.body.err.resmsg = "An internal error has occured.";
        return;
    }

    next();
}

export { getTicketsInProj };
