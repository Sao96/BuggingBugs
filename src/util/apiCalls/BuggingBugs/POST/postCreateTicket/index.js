import { endpoints as ep } from "apiRoutes/BuggingBugs";
import { sharedActions } from "actions/sharedactions";

async function postCreateTicket(
    reqData,
    pid,
    setModified,
    setRes,
    setProcessing,
    dispatch
) {
    if (setProcessing) {
        setProcessing(true);
    }
    reqData.priority = Math.floor(Number(reqData.priority));
    const endpoint = ep.createticket + "?pid=" + pid;
    const res = await fetch(endpoint, {
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
    if (resStatus === 200) {
        setModified(true);
        dispatch({ type: sharedActions.POP_MODAL_STATE });
    } else {
        setRes([resStatus, resData]);
    }
}

export { postCreateTicket };
