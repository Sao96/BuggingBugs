/**
 * @function matchDbResults
 * Iterates through a query and returns a list of all found targets
 * 
 * @param {Array[Object]} results results from DB
 * @param {Array[Object]} targets What to search for
 * @param {String} field What field to search
 */
function matchDbResults(results, targets, resultsField, targetsField) {
    const res = []
    const targetsSet = new Set(targets.map((target) => { return String(target[targetsField]) }));
    results.forEach((result) => {
        if (targetsSet.has(String(result[resultsField]))) {
            res.push(result);
        }
    })

    return res;
}

export { matchDbResults }