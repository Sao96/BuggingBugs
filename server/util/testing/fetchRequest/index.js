import fetch from "node-fetch";

/**
 * @function fetchRequest
 * Performs a fetch request using node-fetch with preset options
 * the server expects to see.
 *
 * @param {String} endpoint
 * @param {String} method
 * @param {Object} reqData
 * @param {String} cookie
 *
 * @return: The retrieved response.
 */
async function fetchRequest(endpoint, method, reqData = null, cookie = null) {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
    };
    if (reqData) {
        options.body = JSON.stringify(reqData);
    }
    if (cookie) {
        options.headers.Cookie = cookie;
    }

    return await fetch(endpoint, options);
}

export { fetchRequest };
