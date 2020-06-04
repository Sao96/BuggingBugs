import { googleVerifier } from "./InfoVerifiers/GoogleVerifier";
import { nativeVerifier } from "./InfoVerifiers/NativeVerifier";

async function verifyInfo(req, res, next) {
    switch (req.body.type) {
        case "google":
            await googleVerifier(req);
            break;
        case "native":
            await nativeVerifier(req);
            break;
        default:
            req.body.err.status = 400;
            req.body.err.what = "Bad Credentials";
    }

    if (req.body.err.status) {
        res.status(req.body.err.status).send(req.body.err.resmsg);
        return;
    }

    next();
}

export { verifyInfo };
