import mongoose from "mongoose";

async function createMongooseConnection() {
    try {
        await mongoose.connect(process.env.DBURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
}

export { createMongooseConnection };
