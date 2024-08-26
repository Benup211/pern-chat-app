import { NextFunction, Request, Response } from "express";
import prisma from "../db/prisma";
import { MessageRepository } from "../repository/messageRepository";
export class MessageController {
    static async welcome(req: Request, res: Response) {
        res.status(200).json({ message: "Welcome to the API" });
    }

    static async sendMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const { message } = req.body;
            const { id: receiverID } = req.params;
            const senderID = req.body.userID;

            let conversation = await MessageRepository.findConversation(senderID,receiverID);
            if (!conversation) {
                conversation = await MessageRepository.CreateConversation(senderID,receiverID);
            }
            const newMessage = await MessageRepository.CreateMessage(message,senderID,conversation.id);
            if (newMessage) {
                conversation = await MessageRepository.UpdateConversation(conversation.id,newMessage.id);
            }
            res.status(200).json({ newMessage });
        } catch (error) {
            next(error);
        }
    }

    static async getMessage(req: Request, res: Response, next: NextFunction) {
        const { id: userToChat } = req.params;
        const senderID = req.body.userID;
        try {
            const conversation = await MessageRepository.AllConversation(senderID,userToChat);
            if (!conversation) {
                res.status(200).json([]);
            }
            res.status(200).json(conversation?.messages);
        } catch (error) {
            next(error);
        }
    }
    static async getUserForSideBar(req:Request,res:Response,next:NextFunction){
        const userID=req.body.userID;
        try{
            const users=await MessageRepository.FindAllUser(userID);
            res.status(200).json(users)
        }catch(error){
            next(error);
        }
    }
}
