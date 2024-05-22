import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express()
const port = 3000


//IO needs express to be an expplicity http server
const httpServer = createServer(app);
const io = new Server(httpServer)

const messages = [
    {
        user: "Sam",
        messageId: 1,
        message: "I don't love you anymore"
    },
    {
        user: "David",
        messageId: 2,
        message: "She is lying to you"
    },

];

//Everything for the socket is defined inside here!
io.on('connection', (socket) => {
    console.log('A user connected');

    io.emit('connection', messages);

    socket.on('connection', () => {

      io.emit('connection', messages);
    });


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


    socket.on('message', (msg) => {

        console.log('message: ' + msg);


          // Parse the message string into a JavaScript object
    const parsedMsg = JSON.parse(msg);

        console.log(parsedMsg)

        messages.push(parsedMsg)


      io.emit('message',parsedMsg );
    });

})



httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});