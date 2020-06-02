import mongoose from "mongoose";
async function nativeUserChecker(req) {
    const query = {
        email: req.body.userInfo.email,
    };
    await mongoose.model("NativeUsers").exists(query, (err, res) => {
        if (err) {
            req.body.err.status = 500;
            req.body.err.what = err;
        } else {
            req.body.existsInDb = res;
        }
    });
}

export { nativeUserChecker };
