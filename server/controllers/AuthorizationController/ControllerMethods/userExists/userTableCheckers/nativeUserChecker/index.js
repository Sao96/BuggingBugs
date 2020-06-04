import mongoose from "mongoose";
async function nativeUserChecker(req) {
    const filter = {
        email: req.body.userData.email,
    };
    try {
        req.body.dbSearch = await mongoose.model("NativeUser").find(filter);
    } catch (err) {
        req.body.err.status = 500;
        req.body.err.what = err;
        req.body.err.resmsg = "An internal error has occured.";
    }
}

export { nativeUserChecker };
