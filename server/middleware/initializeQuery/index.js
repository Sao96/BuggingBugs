function initializeQuery(req, res, next) {
    req.body.err = {};
    req.body.res = {};
    req.body.userData = {};
    console.log(req.url);
    next();
}

export { initializeQuery };
