import { endpoints as ep } from "apiRoutes/BuggingBugs";

/**
 * @function postCreateProject
 *
 * @param {Object} reqData: Expects all required fields filled for a new project.
 * @param {SetState hook} setRes: A hook to update the state of a caller with
 * the backend response.
 * @param {SetState hook} setProcessing: A hook to track the progress of the operation.
 * Sets processing to true when processessing and turns it false when done.
 */
async function postCreateProject(reqData, setRes, setProcessing = null) {
    if (setProcessing) {
        setProcessing(true);
    }
    const res = await fetch(ep.createproject, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Cache-Control": "no-cache",
        },
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(reqData),
    });
    if (setProcessing) {
        setProcessing(false);
    }
    const resStatus = res.status,
        resData = await res.json();
    setRes([resStatus, resData]);
}

export { postCreateProject };
