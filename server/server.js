import express from "express";
import {} from "module-alias/register";
import { GETRoutes, POSTRoutes } from "./routes";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {} from "./models";

const port = 3000;
dotenv.config();
const app = express();
mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
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

app.use((req, res, next) => {
    req.body.err = {};
    req.body.res = {};
    req.body.userData = {};
    console.log(req.url);
    next();
});

app.listen(port, () => {
    console.log(`Server Active on port ${port}`);
});

GETRoutes.forEach((item) => {
    const [path, action] = item;
    app.get("/api" + path, action);
});
POSTRoutes.forEach((item) => {
    const [path, action] = item;
    app.post("/api" + path, action);
});
app.use((req, res, next) => {
    if (!req.body.res.status) {
        return next(req.body.err);
    }
    if (!req.body.res.data) {
        req.body.res.data = {};
    }
    if (!req.body.res.data.message) {
        req.body.res.data.message = "Ok";
    }
    console.log(req.url, "SUCCESS", req.body.res, req.url);
    res.status(req.body.res.status).send(JSON.stringify(req.body.res.data));
});
app.use((err, req, res, next) => {
    if (!(req.body.err.status && req.body.err.restext)) {
        req.body.err.status = 500;
        req.body.err.restext = "An internal error has occured.";
    }
    console.log("ERROR FOUND", err);
    res.status(req.body.err.status).send(
        JSON.stringify({ message: req.body.err.restext })
    );
});
