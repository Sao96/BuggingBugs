const bodyParser = require("body-parser");

const validTo = (to) => {
    return true;
};

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

async function validateTicketFields(req, res, next) {
    if (!req.session.uid) {
        res.status(300).redirect("/login");
    }
    if (!validTo(req.body.to)) {
        req.body.err.status = 400;
        req.body.err.what = "Invalid recipient";
        req.body.err.resmsg = "Invalid recipient";
    } else if (!validDue(req.body.due)) {
        req.body.err.status = 400;
        req.body.err.what = "Invalid due time";
        req.body.err.resmsg = "Invalid due time";
    } else if (!validEnvironment(req.body.environment)) {
        req.body.err.status = 400;
        req.body.err.what = "Invalid environment";
        req.body.err.resmsg = "Invalid environment";
    } else if (!validTags(req.body.tags)) {
        req.body.err.status = 400;
        req.body.err.what = "Invalid tags";
        req.body.err.resmsg = "Invalid tags";
    } else if (!validHeadline(req.body.headline)) {
        req.body.err.status = 400;
        req.body.err.what = "Invalid headline";
        req.body.err.resmsg = "Invalid headline";
    } else if (!validSummary(req.body.summary)) {
        req.body.err.status = 400;
        req.body.err.what = "Invalid summary";
        req.body.err.resmsg = "Invalid summary";
    }

    if (req.body.err.status) {
        res.status(req.body.err.status).send(req.body.err.resmsg);
        console.log(req.body.err.what);
        return; //need to throw error to log its
    }
    req.body.targetIds = {
        [req.body.userData.uid]: -1,
        [req.body.to]: -1,
    };

    next();
}

export { validateTicketFields };
