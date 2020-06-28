import { endpoints as ep } from "apiRoutes/BuggingBugs";

/**
 * @function postRegister
 *
 * @param {Object} regInfo: Expects all required fields filled for a register.
 * @param {String} type: The type of register.
 */
async function postRegister(regInfo, type, dispatch) {
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
}

export { postRegister };
