require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./db");
const app = express();
const http = require("http");
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT
const HOST = process.env.HOST 

const authController = require("./controllers/Auth");
const messageController = require("./controllers/Message");
const sessionValidation = require("./middlewares/session");
const roomController = require("./controllers/Rooms")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth", authController);
app.use("/rooms", sessionValidation, roomController);
app.use("/message", sessionValidation, messageController);

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        })
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error)
    });
});


server.listen(PORT, HOST, () => {
    dbConnect();
    console.log(`[server] listening on ${HOST}:${PORT}`);
});