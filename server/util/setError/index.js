function setError(
    req,
    statusCode = 500,
    what = "No @what param specified",
    resText = "An internal error occured"
) {
    req.body.err.status = statusCode;
    req.body.err.what = what;
    req.body.err.restext = resText;
}

export { setError };
