import mongoose from "mongoose";
import { } from "models";

/**
 * @function deleteTestProjects
 * Removes from @db any project  @param uid is in
 */
async function deleteTestProjects(uid) {
    try {
        await mongoose.model("UserIn").deleteMany(
            { uid: mongoose.Types.ObjectId(uid) }
        );
    } catch (err) {
        fail(err);
    }
}

export { deleteTestProjects };
