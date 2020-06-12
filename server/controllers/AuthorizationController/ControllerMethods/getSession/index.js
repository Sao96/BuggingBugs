/**
 * @function getSession
 * Expects @req.body.userData.uid to be a well defined UID from @db
 *
 * Generates a session for the user.
 */
function getSession(req, res, next) {
    req.session.uid = req.body.userData.uid;
    req.body.res.status = 200;
    req.body.res.data = {};

    next();
}

export { getSession };
