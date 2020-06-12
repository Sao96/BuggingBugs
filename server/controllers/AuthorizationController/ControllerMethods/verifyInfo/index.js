import { googleVerifier } from "./InfoVerifiers/GoogleVerifier";
import { nativeVerifier } from "./InfoVerifiers/NativeVerifier";
import { setError } from "~/util/setError";

/**
 * @function verifyInfo
 * Expects @req.body.type to be a well defined valid type.
 *
 * On success registers user to db.GlobalUsers and db./respective table/
 * and sets
 */
async function verifyInfo(req, res, next) {
    switch (req.body.type) {
        case "google":
            if (!(await googleVerifier(req))) {
                return next(req.body.err);
            }
            break;
        case "native":
            if (!(await nativeVerifier(req))) {
                return next(req.body.err);
            }
            break;
        default:
            setError(req, 400, "Bad defined type", "Not a supported type.");
            return next(req.body.err);
    }

    next();
}

export { verifyInfo };
