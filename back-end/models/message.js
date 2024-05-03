const { mongoose } = require("../db");
const { ObjectId } = mongoose.Schema;

const Message = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: 'user',
            required: true
        },
        room: {
            type: ObjectId,
            ref: 'room',
            required: true
        },
        body: {
            type: String,
            required: true
        }
    }, { timestamps: true }
)

module.exports = mongoose.model("message", Message)