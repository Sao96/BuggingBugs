import mongoose from "mongoose";

var globalUserSchema = new mongoose.Schema({
    email: String,
    name: String,
    pfp: String,
    registerDate: String,
});
mongoose.model("GlobalUser", globalUserSchema, "GlobalUsers");
