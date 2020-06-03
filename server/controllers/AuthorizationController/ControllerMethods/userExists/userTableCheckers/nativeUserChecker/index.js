import mongoose from "mongoose";
async function nativeUserChecker(req) {
    const filter = {
        email: req.body.userData.email,
    };
    await mongoose.model("NativeUsers").find(filter, (err, res) => {
        if (err) {
            req.body.err.status = 500;
            req.body.err.what = err;
            req.body.err.resmsg = "An internal error has occured.";
        } else {
            req.body.dbSearch = res;
        }
    });
}

export { nativeUserChecker };
