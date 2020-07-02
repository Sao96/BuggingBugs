import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function getUserInfo
 * Expects that req.body.userData.uid is already set, searches @db.globalusers
 * for the user with that uid and assigns @req.body.userData.email and name.
 */
async function getUserInfo(req, res, next) {
    try {
        const dbRes = await mongoose
            .model("GlobalUser")
            .find({ _id: req.body.userData.uid });
        req.body.userData.email = dbRes[0].email;
        req.body.userData.name = dbRes[0].name;
        req.body.userData.pfp = dbRes[0].pfp;
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return next(req.body.err);
    }

    next();
}

export { getUserInfo };
