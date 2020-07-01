import mongoose from "mongoose";
import { setError } from "~/util/setError";

const validName = (name) => {
    return typeof name === "string" && name.length > 0;
};

/**
 * @function updateName
 * Checks if @req.body.firstName and @req.body.lastName are valid and if so
 * updates the name from @db.globalusers for the requesting user
 */
async function updateName(req, res, next) {
    if (!validName(req.body.firstName) || !validName(req.body.lastName)) {
        setError(
            req,
            400,
            "Invalid first or last name.",
            "Invalid first or last name."
        );
        return next(req.body.err);
    }
    try {
        const name = req.body.firstName + " " + req.body.lastName;
        await mongoose
            .model("GlobalUser")
            .updateOne({ _id: req.body.userData.uid, name: name });
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }
    req.body.res.status = 200;

    next();
}

export { updateName };
