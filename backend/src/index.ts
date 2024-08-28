import {MainServer} from "./server";
import dotenv from 'dotenv';
import { Server } from "socket.io";
import http from "http";
dotenv.config();
const mainServer = new MainServer();
const PORT=process.env.PORT || 3000;

const socketServer = http.createServer(mainServer.app);
const io=new Server(socketServer,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
    }
});
export const getReceiverSocketID=(receiverID:string)=>{
    return userSocketMap[receiverID];
};
const userSocketMap:{[key:string]:string}={};
io.on("connection",(socket)=>{
    const userID=socket.handshake.query.userID as string;
    if(userID)  userSocketMap[userID]=socket.id;

    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        delete userSocketMap[userID];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
});

socketServer.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} url: http://localhost:${PORT}`);
})

export {io};