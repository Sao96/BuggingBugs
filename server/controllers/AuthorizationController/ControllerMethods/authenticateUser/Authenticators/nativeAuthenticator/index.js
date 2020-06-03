import crypto from "crypto";

function nativeAuthenticator(req) {
    const pwSalt = req.body.dbSearch[0].pwSalt;
    const reqPWEncrypt = crypto
        .createHash("sha256")
        .update(req.body.password + pwSalt)
        .digest("hex");
    if (reqPWEncrypt !== req.body.dbSearch[0].pwSaltedHash) {
        req.body.err.status = 400;
        req.body.err.what = "Invalid Credentials";
        req.body.err.resmsg = "Invalid Credentials";
    }

    req.body.uid = req.body.dbSearch[0].uid;
}

export { nativeAuthenticator };
