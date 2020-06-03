import mongoose from "mongoose";
async function googleUserChecker(req) {
    const filter = {
        sub: req.body.googleInfo.sub,
    };
    await mongoose.model("GoogleUser").find(filter, (err, res) => {
        if (err) {
            req.body.err.status = 500;
            req.body.err.what = err;
            req.body.err.resmsg = "An internal error has occured.";
        } else {
            req.body.dbSearch = res;
        }
    });
}

export { googleUserChecker };
