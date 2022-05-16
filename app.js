"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import { Server as HttpServer } from 'http';
var socket_io_1 = require("socket.io");
var position = {
    x: 200,
    y: 200
};
var expressServer = (0, express_1.default)();
var httpServer = expressServer.listen(3001, function () {
    console.log('Server is running on port 3001');
});
var socketIoServer = new socket_io_1.Server(httpServer, { cors: { origin: "http://localhost:4200" } });
socketIoServer.sockets.on('connection', function (socket) {
    console.log("Client has been connected...");
    socket.emit('position', position);
    socket.on("move", function (data) {
        switch (data) {
            case "left":
                position.x -= 5;
                socketIoServer.emit("position", position);
                break;
            case "right":
                position.x += 5;
                socketIoServer.emit("position", position);
                break;
            case "up":
                position.y -= 5;
                socketIoServer.emit("position", position);
                break;
            case "down":
                position.y += 5;
                socketIoServer.emit("position", position);
                break;
        }
    });
    socket.on('disconnect', function () {
        console.log("Client has been disconnected...");
    });
});
// const Express = require("express");
// const Http = require("http").Server(Express);
// const SocketIo = require("socket.io")(Http);
// const position = {
//     x: 200,
//     y: 200
// };
// SocketIo.on("connection", socket => {
//     socket.emit("position", position);
// });
// Http.listen(3000, () => {
//     console.log("Listening to port : 3000 ...");
// });
