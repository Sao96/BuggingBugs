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

async function sendProjData(req, res) {
    const projData = {
        users: createUserInfoTable(req.body.usersFound),
        tickets: req.body.ticketsFound,
    };
    res.status(200).send(JSON.stringify(projData));
}

export { sendProjData };
