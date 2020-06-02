import mongoose from "mongoose";
async function googleUserChecker(req) {
    const query = {
        sub: req.body.userInfo.sub,
    };
    await mongoose.model("GoogleUsers").exists(query, (err, res) => {
        if (err) {
            req.body.err.status = 500;
            req.body.err.what = err;
        } else {
            req.body.existsInDb = res;
        }
    });
}

export { googleUserChecker };
