import { endpoints as ep } from "apiRoutes/BuggingBugs";
import { dashboardActions } from "actions/dashboardactions";

/**
 *
 * @param {*} reqData fields: invId
 * @param {*} accept
 * @param {*} setProcessing
 * @param {*} invites
 * @param {*} setInvites
 */
async function postProcessInvite(
    reqData,
    accept,
    setProcessing,
    invites,
    setInvites,
    dispatch
) {
    setProcessing(true);
    const endpoint = accept ? ep.acceptinvite : ep.declineinvite;
    await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Cache-Control": "no-cache",
        },
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify(reqData),
        redirect: "follow",
    });
    setProcessing(false);
    for (let idx = 0; idx < invites.length; ++idx) {
        if (invites[idx].invId === reqData.invId) {
            setInvites(invites.slice(0, idx).concat(invites.slice(idx + 1)));
            break;
        }
    }
    dispatch({ type: dashboardActions.SET_INVITES_MODIFIED });
}

export { postProcessInvite };
