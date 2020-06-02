import googleVerifier from "./InfoVerifiers/GoogleVerifier";
import nativeVerifier from "./InfoVerifiers/NativeVerifier";

function getType(req, res) {
    switch (req.body.type) {
        case "google":
            await googleVerifier(req);
            break;
        case "native":
            await nativeVerifier(req);
            break;
        default:
            req.body.err.status = 400;
            req.body.err.what = "Bad Credentials"
    }
    if (req.body.err.status){
        res.status(req.body.err.status).send(req.body.err.what);
        return;
    }

    next();
}

export { getType };
