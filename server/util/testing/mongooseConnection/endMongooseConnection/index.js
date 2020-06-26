import mongoose from "mongoose";

async function endMongooseConnection() {
    try {
        if (mongoose.connect.readyState !== 0) {
            await mongoose.connection.close();
        }
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
}
export { endMongooseConnection };
