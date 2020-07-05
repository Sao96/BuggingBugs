function sendFailedApiCall(err, req, res, next) {
    if (!(req.body.err.status && req.body.err.restext)) {
        req.body.err.status = 500;
        req.body.err.restext = "An internal error has occured.";
    }
    console.log("ERROR FOUND", err);
    res.status(req.body.err.status).send(
        JSON.stringify({ message: req.body.err.restext })
    );
}

export { sendFailedApiCall };
