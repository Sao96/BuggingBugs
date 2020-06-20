import mongoose from "mongoose";

var TicketSchema = new mongoose.Schema({
    pid: mongoose.Schema.Types.ObjectId,
    from: mongoose.Schema.Types.ObjectId,
    to: mongoose.Schema.Types.ObjectId,
    priority: Number,
    due: String,
    environment: String,
    tags: String,
    headline: String,
    summary: String,
    status: Number,
});
mongoose.model("Ticket", TicketSchema, "Tickets");
