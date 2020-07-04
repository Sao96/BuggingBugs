import mongoose from "mongoose";
import { setError } from "~/util/setError";
import isImageUrl from "is-image-url";

const validName = (name) => {
    return typeof name === "string" && name.length > 0;
};
async function verifyInfo(req, res, next) {
    if (!validName(req.body.firstName) || !validName(req.body.lastName)) {
        setError(
            req,
            400,
            "Invalid first or last name.",
            "Invalid first or last name."
        );
        return next(req.body.err);
    } else if (
        typeof req.body.pfp !== "string" ||
        (req.body.pfp.length > 0 && !isImageUrl(req.body.pfp))
    ) {
        setError(
            req,
            400,
            "Bad group image",
            "Please enter a valid group image or leave it blank."
        );
        return next(req.body.err);
    }

    next();
}

export { verifyInfo };
