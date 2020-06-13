import mongoose from "mongoose";

/**
 * @function toIdExists
 * Verifies that @req.body.to is valid and exists in the userbase
 *
 * If true, sets @req.body.toExists to true, else false.
 */
async function toIdExists(req, res, next) {
    req.body.toExists =
        req.body.to && mongoose.Types.ObjectId.isValid(req.body.to);
    next();
}

export { toIdExists }