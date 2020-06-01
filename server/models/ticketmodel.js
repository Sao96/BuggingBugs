import mongoose from "mongoose";
// var ArticleSchema = new mongoose.Schema({
//     slug: {type: String, lowercase: true, unique: true},
//     title: String,
//     description: String,
//     body: String,
//     favoritesCount: {type: Number, default: 0},
//     comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
//     tagList: [{ type: String }],
//     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
//   }, {timestamps: true});

var ticketSchema = new mongoose.Schema({
    priority: String,
    due: String,
    time: String,
    tags: String,
    env: String,
    summary: String,
});
mongoose.model("ticket", ticketSchema, "tickets");
