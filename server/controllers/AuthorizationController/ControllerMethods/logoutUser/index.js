function logoutUser(req, res) {
    if (req.session) {
        req.session.destroy();
    }
}
export { logoutUser };
