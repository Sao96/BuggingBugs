import mongoose from "mongoose";
// if we decide to natively own a user
// then we must manage their password & email ourselves.
var nativeUserSchema = new mongoose.Schema({
    uid: String,
    email: String,
    pwSalt: String,
    pwSaltedHash: String,
});
mongoose.model("user", userSchema, "users");
