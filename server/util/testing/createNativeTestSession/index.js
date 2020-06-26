import { fetchRequest } from "fetchRequest";
import { endpoints as ep } from "endpointUrls";
/**
 * @function createTestSession
 * Creates a new login session with the server
 * @param {Object} info: A object containing the native information
 * to login.
 *
 * @return on success returns a session cookie, on failure returns null.
 */
async function createNativeTestSession(info) {
    const loginRes = await fetchRequest(ep.login, "POST", info);
    if (loginRes.status !== 200) {
        return null;
    }
    return loginRes.headers.get("set-cookie");
}

export { createNativeTestSession };
