import { endpoints as ep } from "routes/BuggingBugs";
/**
 * @function pushNativeLogin
 * @param {Object} regInfo: Expects all required fields filled for a
 * native login.
 * @param {Object} type: The type of login
 */
async function pushLogin(regInfo, type) {
    regInfo.type = type;
    const res = await fetch(ep.login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(regInfo),
    });
}

export { pushLogin };
