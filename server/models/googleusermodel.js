import mongoose from "mongoose";

var googleUserSchema = new mongoose.Schema({
    uid: mongoose.Schema.Types.ObjectId,
    sub: String,
});
mongoose.model("GoogleUser", googleUserSchema, "GoogleUsers");
