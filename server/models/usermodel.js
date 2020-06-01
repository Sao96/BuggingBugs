import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
    type: String,
    name: String,
});
mongoose.model("user", userSchema, "users");
