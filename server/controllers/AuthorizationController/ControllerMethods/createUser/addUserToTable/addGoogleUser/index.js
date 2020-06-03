import mongoose from "mongoose";

async function addGoogleUser(req) {
    const GoogleUser = mongoose.model("GoogleUser");
    const newGoogleUser = new GoogleUser({
        uid: req.body.userData.uid,
        sub: req.body.googleInfo.sub,
    });
    await newGoogleUser.save((err, written) => {
        if (err) {
            req.body.err.status = 500;
            req.body.err.what = err;
        }
    });
}

export { addGoogleUser };
