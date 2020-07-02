function amILogged(req, res, next) {
    req.body.res.status = 200;
    if (req.session.uid) {
        req.body.res.data = {
            loggedIn: true,
            uid: req.session.uid,
            name: req.session.name,
            email: req.session.email,
            pfp: req.session.pfp,
        };
    } else {
        req.body.res.data = {
            loggedIn: false,
        };
    }

    next();
}
export { amILogged };
