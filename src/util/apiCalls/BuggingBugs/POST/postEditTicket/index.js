import { endpoints as ep } from "apiRoutes/BuggingBugs";
import { ticketboardActions } from "actions/ticketboardactions";
import { sharedActions } from "actions/sharedactions";

async function postEditTicket(
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
    const endpoint = ep.updateticket + "?pid=" + pid;
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
    const resStatus = res.status,
        resData = await res.json();
    if (resStatus === 200) {
        dispatch({
            type: ticketboardActions.UPDATE_DISP_TICKET_INFO,
            data: reqData,
        });
        setModified(true);
        dispatch({ type: sharedActions.POP_MODAL_STATE });
    } else {
        setRes([resData, resStatus]);
    }
}

export { postEditTicket };
