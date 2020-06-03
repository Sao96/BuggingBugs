function googleAuthenticator(req) {
    req.body.uid = req.body.dbSearch[0].uid;
}

export { googleAuthenticator };
