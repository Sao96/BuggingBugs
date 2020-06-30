function generateUserMap(users) {
    const userMap = [];
    for (let user in users) {
        userMap.push([user, users[user].name]);
    }
    return userMap;
}

export { generateUserMap };
