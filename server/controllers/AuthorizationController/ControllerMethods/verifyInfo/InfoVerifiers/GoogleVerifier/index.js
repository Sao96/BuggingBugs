import { OAuth2Client } from "google-auth-library";

async function googleVerifier(req, res) {
    if (!req.body.token || typeof authData.token !== "string") {
        return false;
    }
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(clientId);
    const ticket = await client
        .verifyIdToken({
            idToken: authData.token,
            audience: clientId,
        })
        .catch((err) => {
            req.body.err.status = 409;
            req.body.err.what = err;
            req.body.err.resmsg = "Cannot validate google token.";
        });
    if (req.body.err.status) {
        return false;
    }
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
