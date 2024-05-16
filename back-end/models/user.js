const { mongoose } = require("../db");
const { ObjectId } = mongoose.Schema;

const User = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            max: 20
        },
        firstName: {
            type: String,
            required: true,
            max: 50
        },
        lastName: {
            type: String,
            required: true,
            max: 50
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        rooms: {
            type: [ObjectId],
            ref: 'room',
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true}
)

module.exports = mongoose.model("user", User)