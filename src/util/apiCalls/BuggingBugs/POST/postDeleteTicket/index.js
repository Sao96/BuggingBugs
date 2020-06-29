import { endpoints as ep } from "apiRoutes/BuggingBugs";

/**
 * expects pid, tid
 * @param {Object} reqData: An object expected to contain fields: tid
 * @param {*} pid: the pid of the project
 * @param {*} setRes
 * @param {*} setProcessing
 * @param {*} dispatch
 */
async function postTicketDelete(reqData, setRes, setProcessing, dispatch) {
    if (setProcessing) {
        setProcessing(true);
    }
    const endpoint = ep.deleteticket + "?pid=" + pid; //subject to change
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
        dispatch({ type: ticketboardActions.SET_REFRESH_NEEDED });
        dispatch({ type: sharedActions.EMPTY_MODAL_STACK });
    }
    setRes([resData, resStatus]);
}

export { postTicketDelete };
