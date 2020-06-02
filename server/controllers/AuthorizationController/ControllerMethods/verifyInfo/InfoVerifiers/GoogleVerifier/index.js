import { OAuth2Client } from "google-auth-library";

async function googleVerifier(req, res) {
    if (!req.body.token || typeof authData.token !== "string") {
        return false;
    }
    const errFound = null;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(clientId);
    const ticket = await client
        .verifyIdToken({
            idToken: authData.token,
            audience: clientId,
        })
        .catch((err) => {
            errFound = err;
        });

    if (errFound) {
        res.status(409);
        return false;
    }
    const payload = ticket.getPayload();
    req.body.userInfo = {
        sub: payload.sub,
        name: payload.name,
        email: payload.email,
        pfp: payload.picture,
    };

    return true;
}

export { googleVerifier };
