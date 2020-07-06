import path from "path";
import express from "express";
import {} from "module-alias/register";
import { GETRoutes, POSTRoutes } from "./routes";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {} from "./models";
import {
    initializeQuery,
    sendApp,
    sendFailedApiCall,
    sendSuccessfulApiCall,
} from "./middleware";

const apiRegex = /^\/api\/.*$/;

const port = process.env.PORT || 5100;
dotenv.config();
const app = express();
mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use("/build", express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "build")));
app.use(
    session({
        secret: process.env.SESSIONPW,
        resave: false,
        saveUninitialized: false,
        cookie: {
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
app.use(initializeQuery);
GETRoutes.forEach((item) => {
    const [path, action] = item;
    app.get("/api" + path, action);
});
POSTRoutes.forEach((item) => {
    const [path, action] = item;
    app.post("/api" + path, action);
});
["get", "post"].forEach((method) => {
    app[method](apiRegex, sendSuccessfulApiCall);
});
app.use(sendFailedApiCall);
//fallback in case get is unknown
app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(port, () => {
    console.log(`Server Active on port ${port}`);
});
