import { setError } from "~/util/setError";
import mongoose from "mongoose";

const validDue = (due) => {
    const dateRegex = /^(((?:(?:1[6-9]|[2-9]\d)?\d{2})(-)(?:(?:(?:0?[13578]|1[02])(-)31)|(?:(?:0?[1,3-9]|1[0-2])(-)(?:29|30))))|(((?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))(-)(?:0?2(-)29))|((?:(?:(?:1[6-9]|[2-9]\d)?\d{2})(-)(?:(?:0?[1-9])|(?:1[0-2]))(-)(?:0[1-9]|1\d|2[0-8]))))$/;
    return typeof due === "string" && dateRegex.test(due);
};
const validEnvironment = (environment) => {
    return typeof environment === "string";
};

const validTags = (tags) => {
    return typeof tags === "string";
};

const validHeadline = (headline) => {
    return typeof headline === "string";
};

const validSummary = (summary) => {
    return typeof summary === "string";
};

/**
 * @function validateTicketFields
 * Validates all req fields that will be used as tickets, and verify
 * They are all valid entries.
 *
 * On success, sets req.body.targetIds to a dictionary with index of each
 * target ID (from and to) mapped to -1, which should be filled in later
 * to navigate the result of a @db query.
 */
async function validateTicketFields(req, res, next) {
    // if (!req.session.uid) {
    //     res.status(300).redirect("/login");
    // }
    if (!mongoose.Types.ObjectId.isValid(req.body.to)) {
        setError(req, 400, "Invalid Recipient.", "Invalid Recipient.");
    } else if (!validDue(req.body.due)) {
        setError(req, 400, "Invalid Due Time.", "Invalid Due Time.");
    } else if (!validEnvironment(req.body.environment)) {
        setError(req, 400, "Invalid Environment", "Invalid Environment.");
    } else if (!validTags(req.body.tags)) {
        setError(req, 400, "Invalid Tags.", "Invalid Tags.");
    } else if (!validHeadline(req.body.headline)) {
        setError(req, 400, "Invalid Headline.", "Invalid Headline.");
    } else if (!validSummary(req.body.summary)) {
        setError(req, 400, "Invalid Summary.", "Invalid Summary.");
    }

    if (req.body.err.status) {
        return next(req.body.err);
    }
    req.body.targetIds = {
        [req.body.userData.uid]: -1,
        [req.body.to]: -1,
    };

    next();
}

export { validateTicketFields };
