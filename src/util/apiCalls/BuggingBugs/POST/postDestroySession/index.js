import { endpoints as ep } from "apiRoutes/BuggingBugs";

/**
 * @function postDestroySession
 */
async function postDestroySession(setProcessing) {
    await fetch(ep.logout, {
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
    });
    setProcessing(false);
}

export { postDestroySession };
