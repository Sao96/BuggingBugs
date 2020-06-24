import mongoose from "mongoose";
async function createTestTicket(fromUid, toUid, pid) {
    let ticket;
    try {
        const validTicket = {
            from: mongoose.Types.ObjectId(fromUid),
            to: mongoose.Types.ObjectId(toUid),
            priority: 1,
            due: "2021-06-06",
            environment: "Windows 10; React",
            tags: "React, Javascript",
            headline: "A brand new test ticket",
            summary: "Here is a brand new ticket to test with.",
            pid: mongoose.Types.ObjectId(pid),
            expireOn: new Date(),
            status: 0,
        };
        ticket = await mongoose.model("Ticket").insertMany([validTicket]);
    } catch (err) {
        fail(err);
    }
    return ticket;
}
export { createTestTicket };
