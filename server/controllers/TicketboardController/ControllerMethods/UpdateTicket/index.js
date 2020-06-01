import mongoose from "mongoose";
const Tickets = mongoose.model("ticket");

const validTicketSender = async (params) => {
    const senderMatch = {
        _id: params.tid,
        from: params.from,
    };

    if (!(await Tickets.exists(senderMatch))) {
        return false;
    }
};
async function updateTicket(req, res) {
    if (!(await validTicketSender(req.ticketInfo))) {
        res.status(550).send(errMsg[550]);
        return;
    }

    Tickets.insertOne(req.ticketInfo, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(errMsg[500]);
            return;
        }
        res.status(201);
    });
}

export { updateTicket };
