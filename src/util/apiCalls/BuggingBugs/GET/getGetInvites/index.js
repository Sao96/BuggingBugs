import { endpoints as ep } from "apiRoutes/BuggingBugs";
import { dashboardActions as dbA } from "actions/dashboardactions";

/**
 * @function getGetInvites
 *
 * @param {Dispatch hook} dispatch
 */
async function getGetInvites(setRes, setInvitesLoading, dispatch) {
    if (setInvitesLoading) {
        setInvitesLoading(true);
    }
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
    if (setInvitesLoading) {
        setInvitesLoading(false);
    }
    const resStatus = res.status,
        resData = await res.json();
    if (resStatus === 200) {
        dispatch({
            type: dbA.SET_INVITES,
            invites: resData.invites,
            resStatus: resStatus,
        });
    }
    setRes([resStatus, resData]);
}

export { getGetInvites };
