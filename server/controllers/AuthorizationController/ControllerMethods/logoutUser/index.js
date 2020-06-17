/**
 * @function logoutUser
 *
 * Destroys the session of a user, if it exists.
 */
function logoutUser(req, res, next) {
    if (req.session) {
        req.session.destroy();
    }
    req.body.res.status = 200;
    req.body.res.data = {};

    next();
}
export { logoutUser };
