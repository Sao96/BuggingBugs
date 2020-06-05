import mongoose from "mongoose";
import { ObjectId } from "mongodb";

var usersIn = new mongoose.Schema({
    uid: mongoose.Types.ObjectId,
    pid: mongoose.Types.ObjectId,
    authLevel: Number,
});

mongoose.model("UserIn", usersIn, "UsersIn");
