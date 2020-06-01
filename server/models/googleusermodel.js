import mongoose from "mongoose";
// if we decide to natively own a user
// then we must manage their password & email ourselves.
var googleUserSchema = new mongoose.Schema({
    uid: String,
    email: String,
    username: String,
    pwSalt: String,
    pwSaltedHash: String,
});
mongoose.model("googleUser", googleUserSchema, "googleUsers");
