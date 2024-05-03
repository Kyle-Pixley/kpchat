const { mongoose } = require("../db");
const { ObjectId } = mongoose.Schema;

const Room = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        addedUsers: {
            type: [ObjectId],
            ref: 'user',
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("room", Room);