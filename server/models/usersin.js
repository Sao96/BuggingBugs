import mongoose from "mongoose";

var usersIn = new mongoose.Schema({
    uid: String,
    perm: Number,
    pid: String,
});

mongoose.model("usersin", usersIn, "usersin");
