import mongoose from "mongoose";

/**
 * @function addTicketsToDemoProject
 * @param {Array(Object)} tickets
 *
 */
async function addTicketsToDemoProject(tickets) {
    try {
        await mongoose.model("Ticket").insertMany(tickets);
    } catch (err) {
        console.log(err);
    }
}

export { addTicketsToDemoProject };
