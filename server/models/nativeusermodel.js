import mongoose from "mongoose";

var nativeUserSchema = new mongoose.Schema({
    uid: String,
    email: String,
    pwSalt: String,
    pwSaltedHash: String,
});
mongoose.model("NativeUser", nativeUserSchema, "NativeUsers");
