import mongoose from "mongoose";

async function addGlobalUser(req) {
    const GlobalUser = mongoose.model("GlobalUser");
    const newGlobalUser = new GlobalUser({
        email: req.body.userData.email,
        name: req.body.userData.name,
        pfp: req.body.userData.pfp,
        registerDate: "hi",
    });

    await newGlobalUser.save((err, newUser) => {
        if (err) {
            req.body.err.status = 500;
            req.body.err.what = err;
        } else {
            req.body.userData.uid = newUser.id;
        }
    });
}

export { addGlobalUser };
