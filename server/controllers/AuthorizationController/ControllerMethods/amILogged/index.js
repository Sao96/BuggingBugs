function amILogged(req, res, next) {
    req.body.res.status = 200;
    req.body.res.data = { loggedIn: req.session.uid ? true : false };

    next();
}
export { amILogged };
