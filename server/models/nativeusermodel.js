import mongoose from "mongoose";

var nativeUserSchema = new mongoose.Schema({
    uid: mongoose.Schema.Types.ObjectId,
    email: String,
    pwSalt: String,
    pwSaltedHash: String,
});
mongoose.model("NativeUser", nativeUserSchema, "NativeUsers");
