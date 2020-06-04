function getSession(req, res, next) {
    req.session.uid = req.body.userData.uid;
    res.status(200).send("OKaaaaa");
    req.completed = true;
}

export { getSession };
