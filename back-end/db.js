const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const dbConnect = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("[db] is connected to server");
    } catch (err) {
        console.log(`[db] error: ${err.message}`);
    }
}

module.exports = { dbConnect, mongoose }