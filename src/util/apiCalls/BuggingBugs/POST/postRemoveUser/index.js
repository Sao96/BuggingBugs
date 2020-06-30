import { endpoints as ep } from "apiRoutes/BuggingBugs";

/**
 * @function postRemoveUesr
 * @param {Object} reqData: fields: toUid
 * @param {*} pid
 * @param {*} setRes
 */
async function postRemoveUser(reqData, pid, setRes, setProcessing) {
    setProcessing(true);
    const endpoint = ep.removeuser + "?pid=" + pid; //subject to change
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
    setProcessing(false);
    const resStatus = res.status,
        resData = await res.json();
    setRes([resStatus, resData]);
}

export { postRemoveUser };
