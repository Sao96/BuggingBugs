import { OAuth2Client } from "google-auth-library";
const GoogleAuthHandler = async (req, res, authData) => {
    if (!authData.token || typeof authData.token !== "string") {
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

    if (errFound()) {
        res.status(409);
    }
    const payload = ticket.getPayload();
    console.log(payload);
};
const getTypeHandler = (authType) => {
    switch (authType) {
        case "google":
            return GoogleAuthHandler;
        default:
            return null;
    }
};
function login(req, res) {
    const authHandler = getTypeHandler(req.body.type);
    if (!authHandler) {
        res.status(400).send("Invalid Request");
        return;
    }
    authHandler(req.body);
    res.send(JSON.stringify({ a: "KEKW" }));
}

export { login };
