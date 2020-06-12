/**
 * @function googleAuthenticator
 * Expects @req.body.dbSearch to be a list with with at 1 element from
 * @db.GoogleUsers.
 *
 * On success, sets @req.body.userData.uid with the found UID and returns true.
 */
function googleAuthenticator(req) {
    req.body.userData.uid = req.body.dbSearch[0].uid;
    return true;
}

export { googleAuthenticator };
