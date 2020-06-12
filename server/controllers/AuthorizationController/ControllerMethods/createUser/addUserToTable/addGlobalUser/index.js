import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function addGlobalUser
 * Expects @req.body.userData to contain a well defined @db.GlobalUsers model
 *
 * On success adds user to db.GlobalUsers and sets @req.body.userData.uid
 * to the ID of the newly generated user.
 *
 * On failure returns false.
 */
async function addGlobalUser(req) {
    try {
        const GlobalUser = mongoose.model("GlobalUser");
        const newGlobalUser = new GlobalUser({
            email: req.body.userData.email,
            name: req.body.userData.name,
            pfp: req.body.userData.pfp,
            registerDate: "hi",
        });
        const newUser = await newGlobalUser.save();
        req.body.userData.uid = newUser._id;
    } catch (err) {
        setError(req, 500, err, "An internal error has occured.");
        return false;
    }

    return true;
}

export { addGlobalUser };
