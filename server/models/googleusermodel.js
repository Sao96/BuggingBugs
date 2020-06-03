import mongoose from "mongoose";

var googleUserSchema = new mongoose.Schema({
    uid: String,
    sub: String,
});
mongoose.model("GoogleUser", googleUserSchema, "GoogleUsers");
