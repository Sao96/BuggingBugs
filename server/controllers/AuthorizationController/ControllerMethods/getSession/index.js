/**
 * @function getSession
 * Expects @req.body.userData.uid to be a well defined UID from @db
 *
 * Generates a session for the user.
 */
function getSession(req, res, next) {
    req.session.uid = req.body.userData.uid;
    req.session.email = req.body.userData.email;
    req.session.name = req.body.userData.name;
    req.session.pfp = req.body.userData.pfp;
    req.body.res.status = 200;
    req.body.res.data = {
        uid: req.session.uid,
        email: req.session.email,
        name: req.session.name,
        pfp: req.session.pfp,
    };
    next();
}

export { getSession };
