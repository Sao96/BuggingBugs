import mongoose from "mongoose";
const ObjectId = mongoose.QueryCursor;

async function getTickets(req, res) {
    const projection = {
        _id: 0,
        priority: 1,
        due: 1,
        time: 1,
        tags: 1,
        env: 1,
        summary: 1,
    };
    // uid = req.uid; //grab UID from session cookie
    // if (!(await mongoose.model.exists(ObjectId(uid)))) {
    //     res.status(550).send("You do not have permission to view project.");
    //     return;
    // }
    mongoose.model("ticket").find({}, projection, (err, data) => {
        res.send(data);
    });
}

export { getTickets };
