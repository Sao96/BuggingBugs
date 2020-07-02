import { endpoints as ep } from "apiRoutes/BuggingBugs";
import { sharedActions } from "actions/sharedactions";

/**
 * @function postUpdatePfp
 *
 * @param {*} reqData: fields: pfp - a url.
 * @param {*} setRes
 * @param {*} setProcessing
 * @param {*} dispatch
 */
async function postUpdatePfp(reqData, setRes, setProcessing, dispatch) {
    setProcessing(true);
    const res = await fetch(ep.updatepfp, {
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
    setProcessing(false);
    const resStatus = res.status,
        resData = await res.json();
    setRes([resStatus, resData]);
    if (resStatus === 200) {
        dispatch({
            type: sharedActions.SET_USER_DATA,
            userData: { pfp: reqData.pfp },
        });
    }
}

export { postUpdatePfp };
