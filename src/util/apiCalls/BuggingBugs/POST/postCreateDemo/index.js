import { endpoints as ep } from "apiRoutes/BuggingBugs";

/**
 * @function postCreateDemo
 *
 * @param {Object} reqData fields: firstName, lastName, pfp
 * @param {*} setRes
 * @param {*} setProcessing
 */
async function postCreateDemo(reqData, setRes, setProcessing) {
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
    setRes([resStatus, resData]);
}

export { postCreateDemo };
