import mongoose from "mongoose";

var Project = new mongoose.Schema({
    name: String,
    img: String,
});

mongoose.model("Project", Project, "Projects");
