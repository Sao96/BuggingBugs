import mongoose from "mongoose";

async function addGlobalUser(req) {
    try {
        const GlobalUser = mongoose.model("GlobalUser");
        const newGlobalUser = new GlobalUser({
            email: req.body.userData.email,
            name: req.body.userData.name,
            pfp: req.body.userData.pfp,
            registerDate: "hi",
        });
        const newUser = await newGlobalUser.save();
        req.body.userData.uid = newUser._id;
    } catch (err) {
        req.body.err.status = 500;
        req.body.err.what = err;
        req.body.err.restext = "An internal error occured";
    }
}

export { addGlobalUser };
