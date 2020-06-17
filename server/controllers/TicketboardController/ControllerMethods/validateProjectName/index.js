import { setError } from "~/util/setError";

function validateProjectName(req, res, next) {
    if (
        typeof req.body.projectName !== "string" ||
        req.body.projectName.length === 0
    ) {
        setError(req, 400, "Invalid Project Name", "Invalid Project Name");
        return next(req.body.err);
    }

    next();
}
export { validateProjectName };
