const createUserInfoTable = (users) => {
    const userInfoTable = {};
    users.forEach((user) => {
        userInfoTable[user.uid.toString()] = {
            name: user.userInfo.name,
            pfp: user.userInfo.pfp,
        };
    });
    return userInfoTable;
};
/**
 * @function sendProjData
 * Expects @req.body.usersFound and @req.body.ticketsFound to be lists of users
 * and tickets from the database.
 *
 * On success, compiles the users into a direct mapping from their id's to their
 * name and pfp, as well as the ticket data from @db.Tickets.
 */
async function sendProjData(req, res) {
    const projData = {
        users: createUserInfoTable(req.body.usersFound),
        tickets: req.body.ticketsFound,
    };
    req.body.res.status = 200;
    req.body.res.data = { projData };

    next();
}

export { sendProjData };
