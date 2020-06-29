import { endpoints as ep } from "apiRoutes/BuggingBugs";
import { ticketboardActions as tbA } from "actions/ticketboardactions";

async function getLoadProject(pid, setRes, setTicketsLoading, dispatch) {
    setTicketsLoading(true);
    const endpoint = ep.loadproject + "?pid=" + pid;
    const res = await fetch(endpoint, {
        method: "GET",
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
    setTicketsLoading(false);
    const resStatus = res.status,
        resData = await res.json();
    if (resStatus === 200) {
        dispatch({
            type: tbA.SET_TICKETBOARD_INFO,
            uid: resData.uid,
            users: resData.users,
            tickets: resData.tickets,
            authLevel: resData.authLevel,
        });
    }
    setRes([resStatus, resData]);
}

export { getLoadProject };
