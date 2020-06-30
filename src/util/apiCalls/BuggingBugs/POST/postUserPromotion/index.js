import { endpoints as ep } from "apiRoutes/BuggingBugs";

/**
 *
 * @param {*} reqData: fields: to
 * @param {*} pid
 * @param {*} setRes
 */
async function postUserPromotion(reqData, pid, setRes) {
    const endpoint = ep.promoteuser + "?pid=" + pid; //subject to change
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
    setRes([resStatus, resData]);
}

export { postUserPromotion };
