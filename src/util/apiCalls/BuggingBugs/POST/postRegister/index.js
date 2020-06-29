import { endpoints as ep } from "apiRoutes/BuggingBugs";

/**
 * @function postRegister
 *
 * @param {Object} regInfo: Expects all required fields filled for a register.
 * @param {String} type: The type of register.
 */
async function postRegister(regInfo, type, setRes, setProcessing = null) {
    if (setProcessing) {
        setProcessing(true);
    }
    regInfo.type = type;
    const res = await fetch(ep.register, {
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
        body: JSON.stringify(regInfo),
    });
    if (setProcessing) {
        setProcessing(false);
    }
    const resStatus = res.status,
        resData = await res.json();
    setRes([resStatus, resData]);
}

export { postRegister };
