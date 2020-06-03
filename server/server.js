import express from "express";
import {} from "./models/ticketmodel";
import { GETRoutes, POSTRoutes } from "./routes/routes.js";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
mongoose.connect(process.env.DBURL);
app.use(
    session({
        secret: process.env.SESSIONPW,
        resave: false,
        saveUninitialized: false,
        cookie: {
            key: "user_sid",
            expires: 1000 * 60 * 60 * 24 * 360 * 5,
        },
    })
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res) => {
    req.body.err = {};
});

app.listen(3000, () => {
    console.log("Server Active");
});

GETRoutes.forEach((item) => {
    const [path, action] = item;
    app.get(path, action);
});
POSTRoutes.forEach((item) => {
    const [path, action] = item;
    app.post(path, action);
});
