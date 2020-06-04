import mongoose from "mongoose";
async function googleUserChecker(req) {
    const filter = {
        sub: req.body.googleInfo.sub,
    };
    try {
        req.body.dbSearch = await mongoose.model("GoogleUser").find(filter);
    } catch (err) {
        req.body.err.status = 500;
        req.body.err.what = err;
        req.body.err.resmsg = "An internal error has occured.";
    }
}

export { googleUserChecker };
