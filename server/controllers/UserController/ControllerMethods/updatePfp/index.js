import mongoose from "mongoose";
import { setError } from "~/util/setError";
import isImageUrl from "is-image-url";

/**
 * @function updatePfp
 * Checks if @req.body.pfp is valid and if so
 * updates the pfp from @db.globalusers for the requesting user
 */
async function updatePfp(req, res, next) {
    if (!(typeof req.body.pfp === "string" && isImageUrl(req.body.pfp))) {
        setError(req, 400, "Invalid URL", "Url is not an image.");
        return next(req.body.err);
    }
    try {
        await mongoose
            .model("GlobalUser")
            .updateOne({ _id: req.body.userData.uid }, { pfp: req.body.pfp });
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }
    req.body.res.status = 200;
    req.session.pfp = req.body.pfp;

    next();
}

export { updatePfp };
