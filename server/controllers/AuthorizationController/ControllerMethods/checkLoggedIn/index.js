import mongoose from "mongoose";

function checkLoggedIn(req, res, next) {
    if (req.session.uid) {
        req.body.userData.uid = mongoose.Types.ObjectId(req.session.uid);
    } else {
        req.body.err.status = 300;
        req.body.err.what = "User is not logged in";
        req.body.err.resmsg = "Not logged in";

        res.status(req.body.err.status).send(JSON.stringify({ url: "/login" }));
        return;
    }

    next();
}
export { checkLoggedIn };
