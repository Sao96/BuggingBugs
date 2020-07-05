function sendSuccessfulApiCall(req, res, next) {
    if (!req.body.res.status) {
        return next(req.body.err);
    }
    if (!req.body.res.data) {
        req.body.res.data = {};
    }
    if (!req.body.res.data.message) {
        req.body.res.data.message = "Ok";
    }
    console.log(req.url, "SUCCESS", req.body.res, req.url);
    res.status(req.body.res.status).send(JSON.stringify(req.body.res.data));
}

export { sendSuccessfulApiCall };
