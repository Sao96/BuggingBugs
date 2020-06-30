import { endpoints as ep } from "apiRoutes/BuggingBugs";
import { sharedActions } from "actions/sharedactions";

async function postUserDemote(pid, setRes, dispatch, setProcessing) {
    setProcessing(true);
    const endpoint = ep.demoteself + "?pid=" + pid; //subject to change
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
    });
    setProcessing(false);
    const resStatus = res.status,
        resData = await res.json();

    if (resStatus === 200) {
        dispatch({ type: sharedActions.POP_MODAL_STATE });
    } else {
        setRes([resStatus, resData]);
    }
}
export { postUserDemote };
