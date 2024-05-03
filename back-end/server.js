require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./db");
const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "127.0.0.1";

const authController = require("./controllers/auth");
// const messageController = require("./controllers/message");
// const sessionValidation = require("./middlewares/session");
// const roomController = require("./controllers/rooms")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth", authController);
// app.use("/rooms", sessionValidation, roomController);
// app.use("/message", sessionValidation, messageController);

app.listen(PORT, HOST, () => {
    dbConnect();
    console.log(`[server] listening on ${HOST}:${PORT}`);
});