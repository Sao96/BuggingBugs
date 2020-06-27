/**
 * @function resolveRefValues
 * Takes an object of fields who map to a ref, and for each ref, gets the
 * current value.
 * @param {Object} refs:The object of refs to convert.
 *
 * @return: A new object with each field in @refs now mapping to its value.
 */
function resolveRefValues(refs) {
    const res = {};
    for (let field in refs) {
        if (refs[field].current) {
            res[field] = refs[field].current.value;
        }
    }
    console.log(res);
    return res;
}

export { resolveRefValues };
