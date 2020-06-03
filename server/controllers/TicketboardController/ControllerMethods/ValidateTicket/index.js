import { ObjectID } from "mongodb";

const validTo = (to) => {
    return to && ObjectID.isValid(pid);
};
const validTid = (tid) => {
    return !tid || ObjectID.isValid(tid);
};
const validPid = (pid) => {
    return pid && ObjectID.isValid(pid);
};
const validPriority = (priority) => {
    return (
        priority && Number.isInteger(priority) && 0 <= priority && priority <= 3
    );
};

const validTags = (tags) => {
    return (
        tags &&
        Array.isArray(tags) &&
        tags.length === tags.filter((tag) => typeof tag === "string").length
    );
};

const validEnv = (env) => {
    return env && typeof env === "string";
};

const validSummary = (summary) => {
    return summary && typeof summary === "string";
};

function validFields(params) {
    return (
        validTo(params.to) &&
        validTid(params.tid) &&
        validPid(params.pid) &&
        validPriority(params.priority) &&
        validTags(params.tags) &&
        validEnv(params.env) &&
        validSummary(params.summary)
    );
}

async function validateTicket(req, res) {
    const params = {
        from: uid,
        to: req.query.to,
        pid: req.query.pid,
        priority: req.query.priority,
        tags: req.query.tags,
        env: req.query.env,
        summary: req.query.summary,
    };
    if (req.query.tid) params.tid = req.query.tid; //in case the next op is update
    if (!validFields(params)) {
        req.resstat;
        res.status(400).send("Invalid Request");
        return;
    }

    req.ticketInfo = params;
    next();
}

export { validateTicket };
