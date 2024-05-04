const router = require("express").Router();
const Room = require("../models/room");
const adminValidation = require("../middlewares/admin");


// creates new room under the currently logged in user
router.post("/", async (req, res) => {
    console.log('Create room route hit')
    try {
        const { name, description } = req.body;
        const _id = req.user._id;

        const newRoom = new Room({ name, description, addedUsers: [{ _id }] });
        await newRoom.save();

        res.status(201).json({
            message: "Room Created",
            newRoom
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


// get all rooms
router.get("/", async (req, res) => {
    try {
        const allRooms = await Room.find().populate("addedUsers", { password: 0 });
        res.status(200).json({
            message: "All Rooms",
            allRooms
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// admin users can update rooms
router.put("/:room_id", async (req, res) => {
    try {
        if (!req.user.isAdmin) throw Error("User does not have permission");

        const { room_id } = req.params;

        const { name, description, addedUsers } = req.body;

        const updateStatus = await Room.updateOne({ _id: room_id }, { $set: { name, description, addedUsers } });

        if (updateStatus.matchedCount == 0) throw Error(`${room_id} does not exist. No update was performed.`);

        res.status(200).json({
            message: `room ${updateStatus.matchedCount} was updated`
        }); 
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// admin users can delete rooms
router.delete("/:room_id", async (req, res) => {
    try {
        if (!req.user.isAdmin) throw Error("User does not have permission");

        const { room_id } = req.params;
        const deleteStatus = await Room.deleteOne({ _id: room_id });
        if (deleteStatus.deletedCount == 0) throw Error(`${room_id} does not exist. No update was performed.`);
        res.status(200).json({
            message: `${room_id} was deleted`
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;