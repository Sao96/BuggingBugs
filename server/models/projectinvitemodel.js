import mongoose from "mongoose";

var projectInviteSchema = new mongoose.Schema({
    pid: mongoose.Schema.Types.ObjectId,
    uid: mongoose.Schema.Types.ObjectId,
});

mongoose.model("ProjectInvite", projectInviteSchema, "ProjectInvites");
