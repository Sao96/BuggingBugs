import { endpoints as ep } from "apiRoutes/BuggingBugs";
import { sharedActions as sA } from "actions/sharedactions";

/**
 * @function postCreateDemo
 *
 * @param {Object} reqData fields: firstName, lastName, pfp
 * @param {*} setRes
 * @param {*} setProcessing
 */
async function postCreateDemo(reqData, setRes, setProcessing, dispatch) {
    setProcessing(true);
    const res = await fetch(ep.createdemo, {
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
    if (resStatus === 200) {
        dispatch({
            type: sA.SET_LOGGED_IN,
            loggedIn: true,
        });
        dispatch({
            type: sA.SET_USER_DATA,
            userData: {
                uid: resData.uid,
                name: resData.name,
                email: resData.email,
                pfp: resData.pfp,
            },
        });
    }
    setRes([resStatus, resData]);
}

export { postCreateDemo };
