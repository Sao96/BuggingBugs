import mongoose from "mongoose";
import { setError } from "~/util/setError";
import isImageUrl from "is-image-url";

/**
 * @function updateGroupImage
 * Updates @db.Project.img into @req.body.img.
 */
async function updateGroupImage(req, body, next) {
    if (!(typeof req.body.img === "string" && isImageUrl(req.body.img))) {
        setError(req, 400, "Invalid URL", "Url is not an image.");
        return next(req.body.err);
    }

    try {
        const pid = mongoose.Types.ObjectId(req.query.pid);
        await mongoose
            .model("Project")
            .update({ _id: pid }, { $set: { img: req.body.img } });
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    req.body.res.status = 200;

    next();
}

export { updateGroupImage };
