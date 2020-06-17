import mongoose from "mongoose";
import { setError } from "~/util/setError";

/**
 * @function removeUser
 * Removes from @db.UsersIn the pid matching @req.query.pid and the uid of
 * @req.body.userData.uid.
 */
export { removeUser };
