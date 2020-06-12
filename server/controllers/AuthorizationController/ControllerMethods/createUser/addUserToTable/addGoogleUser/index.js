import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function addGoogleUser
 * Expects @req.body.userData.uid to be defined
 *
 * On success registers user to db.GoogleUsers and returns true
 * On failure returns false
 */
async function addGoogleUser(req) {
    try {
        const GoogleUser = mongoose.model("GoogleUser");
        const newGoogleUser = new GoogleUser({
            uid: req.body.userData.uid,
            sub: req.body.googleInfo.sub,
        });
        await newGoogleUser.save();
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return false;
    }

    return true;
}

export { addGoogleUser };
