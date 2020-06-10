function amILogged(req, res) {
    if (req.session.uid) {
        res.status(200).send("Logged in");
    } else {
        res.status(400).send("Not logged in");
    }
}
export { amILogged };
