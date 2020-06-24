import { setError } from "~/util/setError";
import { nativeLoginVerifier } from "./verifiers/nativeLoginVerifier";
import { googleVerifier } from "~/util/oauth2/googleVerifier";
/**
 * @function verifyLoginInfo
 * Expects @req.body.type to be a well defined valid type.
 *
 * On success registers user to db.GlobalUsers and db./respective table/
 * and sets
 */
async function verifyLoginInfo(req, res, next) {
    switch (req.body.type) {
        case "google":
            if (!(await googleVerifier(req))) {
                return next(req.body.err);
            }
            break;
        case "native":
            if (!(await nativeLoginVerifier(req))) {
                return next(req.body.err);
            }
            break;
        default:
            setError(req, 400, "Bad defined type", "Not a supported type.");
            return next(req.body.err);
    }

    next();
}

export { verifyLoginInfo };
