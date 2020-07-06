function initializeQuery(req, res, next) {
    req.body.err = {};
    req.body.res = {};
    req.body.userData = {};
    next();
}

export { initializeQuery };
