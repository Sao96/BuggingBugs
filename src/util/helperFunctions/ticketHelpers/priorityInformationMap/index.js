/**
 * @function priorityInformationMap
 * @param {Number} priorityCode
 *
 * returns [priority text, background color, priority text color]
 */
function priorityInformationMap(priorityCode) {
    switch (priorityCode) {
        case 0: //max priority
            return ["MAX", "rgb(143, 0, 0)", "red"];
        case 1:
            return ["High", "rgb(207, 80, 0)", "rgb(255,175,0)"];
        case 2: //med priority
            return ["Med", "rgb(156, 142, 0)", "yellow"];
        case 3:
            return ["Low", "rgb(38, 135, 16)", "rgb(0, 255, 22)"];
        default:
            return ["/", "gray", "white"];
    }
}

export { priorityInformationMap };
