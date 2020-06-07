function checkLoggedIn(req, res) {
    if (req.session.uid) {
        req.userData.uid = req.session.uid;
    } else {
        req.body.err.status = 403;
        req.body.err.what = "User is not logged in";
        req.body.err.resmsg = "Not logged in";

        res.status(req.body.err.status).send(req.body.err.resmsg);
        return;
    }

    next();
}
export { checkLoggedIn };
