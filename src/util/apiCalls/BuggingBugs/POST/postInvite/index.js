import { endpoints as ep } from "apiRoutes/BuggingBugs";

/**
 * @param {Object} reqData expects to have the fields: toUid
 * @param {*} pid
 * @param {*} setRes
 */
async function postInvite(reqData, pid, setRes) {
    const endpoint = ep.createinvite + "?pid=" + pid; //subject to change
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

export { postInvite };
