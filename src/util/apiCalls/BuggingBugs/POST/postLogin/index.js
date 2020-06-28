import { endpoints as ep } from "apiRoutes/BuggingBugs";

/**
 * @function postLogin
 *
 * @param {Object} regInfo: Expects all required fields filled for a login.
 * @param {String} type: The type of login.
 */
async function postLogin(regInfo, type, dispatch) {
    regInfo.type = type;
    const res = await fetch(ep.login, {
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

export { postLogin };
