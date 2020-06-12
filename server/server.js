import express from "express";
import { } from "./models/ticketmodel";
import { } from "module-alias/register";
import { GETRoutes, POSTRoutes } from "./routes/routes.js";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { } from "./models";

dotenv.config();
const app = express();
mongoose.connect(process.env.DBURL);
app.use(
    session({
        secret: process.env.SESSIONPW,
        resave: false,
        saveUninitialized: false,
        cookie: {
            // key: "user_sid",
            expires: 1000 * 60 * 60 * 24 * 360 * 5,
        },
    })
);
app.use(
    cors({
        origin: "http://localhost:8080",
        methods: "GET,POST",
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.body.err = {};
    req.body.res = {};
    req.body.userData = {};
    next();
});

app.listen(3000, () => {
    console.log("Server Active");
});

GETRoutes.forEach((item) => {
    const [path, action] = item;
    app.get("/api" + path, action);
});
POSTRoutes.forEach((item) => {
    const [path, action] = item;
    app.post("/api" + path, action);
});
app.use((req, res) => {
    console.log("SUCCESS", req.body.res);
    console.log(req.body.res.status)
    console.log(req.url)
    res.status(req.body.res.status).send(JSON.stringify(req.body.res.data));
});
app.use((err, req, res, next) => {
    //handle all failure of responses
    res.status(req.body.err.status).send(JSON.stringify(req.body.err.restxt));
    console.log("ERROR FOUND", err);
});
