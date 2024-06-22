const router = require("express").Router();
const Message = require("../models/message");
const adminValidation = require("../middlewares/admin");


router.get("/:room_id", async (req, res) => {
    try {
        console.log('aslkdjf;alskjfd')
        const { room_id } = req.params;
        const allMessages = await Message.find({ room: room_id }).populate("user", { userName: 1 });
        res.status(200).json({
            message: `All messages from room ${room_id}`,
            allMessages
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Create a message assigned to a specific room
router.post("/:room_id", async (req, res) => {
    try {
        const { body } = req.body;
        const { room_id } = req.params;
        const _id = req.user._id;
        const newMessage = new Message({
            user: _id,
            room: room_id,
            body
        });
        await Message.populate(newMessage, { path:"user" });
        await newMessage.save();
        res.status(201).json({
            message: `Message Created`,
            newMessage
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// admin update message
router.put("/:message_id", async (req, res) => {
    try {
        const { message_id } = req.params;
        const { body } = req.body;

        console.log(body);

        const findMessage = await Message.findOne({ _id: message_id });
        if (!findMessage) throw Error("No message was found");

        console.log(`Message Created By: ${findMessage.user._id}`, `User Request To Delete: ${req.user._id}`);

        if (!req.user.isAdmin && !findMessage.user._id.equals(req.user._id)) throw Error("User does not have permission");

        const updateStatus = await Message.updateOne({ _id: message_id }, { $set: { body } });
        
        if (updateStatus.matchedCount == 0) throw Error(`${message_id} does not exist. no update was preformed.`);

        res.status(201).json({
            message: `${message_id} was updated`,
            updateStatus
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});



router.delete("/:message_id", async (req, res) => {
    try {
        const { message_id } = req.params;

        const findMessage = await Message.findOne({ _id: message_id });

        if (!findMessage) throw Error("No message was found");

        console.log(`Message Created By: ${findMessage.user._id}`, `User Request To Delete: ${req.user._id}`);

        if (!req.user.isAdmin && !findMessage.user._id.equals(req.user._id)) throw Error("User does not have permission");

        const deleteStatus = await Message.deleteOne({ _id: message_id });

        if (deleteStatus.deletedCount == 0) throw Error (`${message_id } does not exist. No delete was performed.`);
        res.status(201).json({
            message: `${message_id} was deleted`,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;