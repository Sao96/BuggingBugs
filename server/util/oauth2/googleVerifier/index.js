import { OAuth2Client } from "google-auth-library";
import { setError } from "~/util/setError";

/**
 * @function googleVerifier
 * Expects @req.body.token to be a well defined google token string.
 *
 * On success retrieves information from google about the client and sets
 * @req.body.userData name, email, and pfp fields; @req.body.googleInfo
 * subject to the found subject of the google token, and finally returns true.
 */
async function googleVerifier(req) {
    console.log(req.body.token);
    if (!req.body.token || typeof req.body.token !== "string") {
        setError(req, 400, "Bad google token.", "Bad google token.");
        return false;
    }
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(clientId);
    const ticket = await client
        .verifyIdToken({
            idToken: req.body.token,
            audience: clientId,
        })
        .catch((err) => {
            setError(req, 409, err, "Cannot validate google token.");
            return false;
        });
    const payload = ticket.getPayload();
    req.body.googleInfo = {
        sub: payload.sub,
    };
    req.body.userData.name = payload.name;
    req.body.userData.email = payload.email;
    req.body.userData.pfp = payload.picture;

    return true;
}

export { googleVerifier };
