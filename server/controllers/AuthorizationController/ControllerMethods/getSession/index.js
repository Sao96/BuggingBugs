function getSession(req, res, next) {
    req.session.uid = req.body.userData.uid;
    res.send(200);
    req.completed = true;
}

export { getSession };
