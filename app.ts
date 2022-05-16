import express from 'express';
// import { Server as HttpServer } from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';

const position = {
    x: 200,
    y: 200
};

const expressServer = express();

const httpServer = expressServer.listen(3001, () => {
    console.log('Server is running on port 3001');
});

const socketIoServer = new SocketIoServer(httpServer, { cors: { origin: "http://localhost:4200" } });

socketIoServer.sockets.on('connection', (socket: Socket) => {
    console.log("Client has been connected...");

    socket.emit('position', position);
    socket.on("move", data => {
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

    socket.on('disconnect', () => {
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