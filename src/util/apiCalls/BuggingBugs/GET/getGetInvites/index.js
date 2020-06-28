import { endpoints as ep } from "apiRoutes/BuggingBugs";
import { dashboardActions as dbA } from "actions/dashboardactions";

/**
 * @function getGetInvites
 *
 * @param {Dispatch hook} dispatch
 */
async function getGetInvites(dispatch) {
    const res = await fetch(ep.getinvites, {
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
    const resStatus = res.status,
        resData = await res.json();

    dispatch({
        type: dbA.SET_INVITES,
        invites: resData.invites,
        resStatus: resStatus,
    });
}

export { getGetInvites };
