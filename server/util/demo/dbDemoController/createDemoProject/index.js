import mongoose from "mongoose";

/**
 * @function createDemoProject
 *
 * @param {String} name
 * @param {String} img
 */
async function createDemoProject(name, img) {
    let projData;
    try {
        projData = await mongoose
            .model("Project")
            .create({ name: name, img: img });
    } catch (err) {
        console.log(err);
    }

    return projData;
}

export { createDemoProject };
