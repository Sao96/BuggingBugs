function googleAuthenticator(req) {
    req.body.userData.uid = req.body.dbSearch[0].uid;
}

export { googleAuthenticator };
