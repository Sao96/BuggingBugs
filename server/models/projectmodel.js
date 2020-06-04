import mongoose from "mongoose";

var Project = new mongoose.Schema({
    name: String,
});

mongoose.model("Project", Project, "Projects");
